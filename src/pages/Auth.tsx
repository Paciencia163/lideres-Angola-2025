import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { z } from "zod";

const registerSchema = z.object({
  full_name: z.string().trim().min(3, "Indique o nome completo").max(120),
  email: z.string().trim().email("E-mail inválido").max(255),
  password: z.string().min(8, "A palavra-passe deve ter pelo menos 8 caracteres").max(72),
  phone: z.string().trim().min(6, "Indique o telefone").max(30),
  whatsapp: z.string().trim().max(30).optional().or(z.literal("")),
  nationality: z.string().trim().min(2, "Indique a nacionalidade").max(60),
  country: z.string().trim().min(2, "Indique o país de residência").max(60),
  province: z.string().trim().max(60).optional().or(z.literal("")),
  city: z.string().trim().max(60).optional().or(z.literal("")),
  profession: z.string().trim().max(80).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  position: z.string().trim().max(80).optional().or(z.literal("")),
});

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [busy, setBusy] = useState(false);
  const [terms, setTerms] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate("/painel", { replace: true });
  }, [user, loading, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(form.get("email") ?? "").trim(),
      password: String(form.get("password") ?? ""),
    });
    setBusy(false);
    if (error) {
      toast.error(
        error.message.includes("Invalid login")
          ? "E-mail ou palavra-passe incorretos."
          : error.message,
      );
      return;
    }
    navigate("/painel", { replace: true });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const values = Object.fromEntries(form.entries()) as Record<string, string>;

    const parsed = registerSchema.safeParse(values);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    if (parsed.data.password !== confirm) {
      toast.error("As palavras-passe não coincidem.");
      return;
    }
    if (!terms) {
      toast.error("É necessário aceitar os Termos e a Política de Privacidade.");
      return;
    }

    setBusy(true);
    const { password, email, ...meta } = parsed.data;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/painel`, data: meta },
    });
    setBusy(false);
    if (error) {
      toast.error(
        error.message.includes("already registered")
          ? "Já existe uma conta com este e-mail."
          : error.message,
      );
      return;
    }
    setEmailSent(true);
    toast.success("Conta criada. Verifique o seu e-mail para confirmar o acesso.");
  };

  const handleGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Não foi possível iniciar sessão com Google.");
      return;
    }
    if (result.redirected) return;
    navigate("/painel", { replace: true });
  };

  const field = (name: string, label: string, props: Record<string, unknown> = {}) => (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      <Input id={name} name={name} {...props} />
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/60">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="font-heading text-sm tracking-[0.2em] text-primary">
            LÍDERES ANGOLA
          </Link>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-heading text-foreground">
              Plataforma Líderes Angola
            </h1>
            <p className="text-muted-foreground font-body text-sm mt-3">
              Aceda à sua conta para indicar figuras e instituições e acompanhar o processo.
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-8">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="register">Criar conta</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-5 border border-border/60 rounded-lg p-6 md:p-8 bg-card/40">
                {field("email", "E-mail", { type: "email", required: true, autoComplete: "email" })}
                {field("password", "Palavra-passe", {
                  type: "password",
                  required: true,
                  autoComplete: "current-password",
                })}
                <Button type="submit" disabled={busy} className="w-full">
                  {busy ? "A entrar…" : "Entrar"}
                </Button>
                <div className="relative py-2 text-center">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground bg-card/40 px-3">
                    ou
                  </span>
                </div>
                <Button type="button" variant="outline" className="w-full" onClick={handleGoogle}>
                  Continuar com Google
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              {emailSent ? (
                <div className="border border-primary/40 rounded-lg p-8 text-center bg-primary/5">
                  <h2 className="font-heading text-xl text-foreground mb-3">Confirme o seu e-mail</h2>
                  <p className="text-sm text-muted-foreground font-body">
                    Enviámos um link de confirmação. Depois de confirmar, poderá iniciar sessão e
                    começar a fazer indicações.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleRegister}
                  className="space-y-5 border border-border/60 rounded-lg p-6 md:p-8 bg-card/40"
                >
                  <div className="grid md:grid-cols-2 gap-5">
                    {field("full_name", "Nome completo *", { required: true })}
                    {field("email", "E-mail *", { type: "email", required: true })}
                    {field("phone", "Telefone *", { required: true })}
                    {field("whatsapp", "WhatsApp")}
                    {field("nationality", "Nacionalidade *", { required: true })}
                    {field("country", "País de residência *", { required: true })}
                    {field("province", "Província / Estado")}
                    {field("city", "Cidade")}
                    {field("profession", "Profissão")}
                    {field("company", "Empresa / Instituição")}
                    {field("position", "Cargo")}
                    {field("password", "Palavra-passe *", {
                      type: "password",
                      required: true,
                      autoComplete: "new-password",
                    })}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm" className="text-xs uppercase tracking-wider text-muted-foreground">
                      Confirmar palavra-passe *
                    </Label>
                    <Input
                      id="confirm"
                      type="password"
                      required
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                    />
                  </div>

                  <label className="flex items-start gap-3 text-sm text-muted-foreground font-body">
                    <Checkbox
                      checked={terms}
                      onCheckedChange={(v) => setTerms(v === true)}
                      className="mt-0.5"
                    />
                    <span>
                      Aceito os Termos e Condições e a Política de Privacidade dos Prémios Líderes
                      Angola Global.
                    </span>
                  </label>

                  <Button type="submit" disabled={busy} className="w-full">
                    {busy ? "A criar conta…" : "Criar conta de Indicador"}
                  </Button>
                </form>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
