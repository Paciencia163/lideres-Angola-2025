import { useEffect, useState } from "react";
import PlatformLayout from "@/components/PlatformLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const FIELDS: [string, string][] = [
  ["full_name", "Nome completo"],
  ["phone", "Telefone"],
  ["whatsapp", "WhatsApp"],
  ["nationality", "Nacionalidade"],
  ["country", "País de residência"],
  ["province", "Província / Estado"],
  ["city", "Cidade"],
  ["profession", "Profissão"],
  ["company", "Empresa / Instituição"],
  ["position", "Cargo"],
];

const Perfil = () => {
  const { user } = useAuth();
  const [values, setValues] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) return;
        const next: Record<string, string> = {};
        [...FIELDS.map(([k]) => k), "biography"].forEach((k) => {
          next[k] = (data as Record<string, string | null>)[k] ?? "";
        });
        setValues(next);
      });
  }, [user]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (values.full_name?.trim().length < 3) {
      toast.error("Indique o nome completo.");
      return;
    }
    setBusy(true);
    const { error } = await supabase
      .from("profiles")
      .update({ ...values, email: user.email })
      .eq("id", user.id);
    setBusy(false);
    if (error) {
      toast.error("Não foi possível guardar o perfil.");
      return;
    }
    toast.success("Perfil actualizado.");
  };

  const set = (k: string, v: string) => setValues((p) => ({ ...p, [k]: v }));

  return (
    <PlatformLayout title="Meu Perfil" subtitle="Mantenha os seus dados actualizados.">
      <form onSubmit={save} className="space-y-6 max-w-3xl">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">E-mail</Label>
            <Input value={user?.email ?? ""} disabled />
          </div>
          {FIELDS.map(([key, label]) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key} className="text-xs uppercase tracking-wider text-muted-foreground">
                {label}
              </Label>
              <Input
                id={key}
                value={values[key] ?? ""}
                onChange={(e) => set(key, e.target.value)}
                maxLength={150}
              />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Label htmlFor="biography" className="text-xs uppercase tracking-wider text-muted-foreground">
            Biografia
          </Label>
          <Textarea
            id="biography"
            rows={5}
            value={values.biography ?? ""}
            onChange={(e) => set("biography", e.target.value)}
            maxLength={3000}
          />
        </div>
        <Button type="submit" disabled={busy}>
          {busy ? "A guardar…" : "Guardar alterações"}
        </Button>
      </form>
    </PlatformLayout>
  );
};

export default Perfil;
