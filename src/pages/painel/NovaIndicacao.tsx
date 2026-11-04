import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlatformLayout from "@/components/PlatformLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NOMINATION_TYPES, NominationType } from "@/lib/nominations";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  nominee_name: z.string().trim().min(3, "Indique o nome completo do indicado").max(150),
  justification: z
    .string()
    .trim()
    .min(50, "A justificação deve ter pelo menos 50 caracteres")
    .max(5000),
  email: z.string().trim().email("E-mail do indicado inválido").max(255).optional().or(z.literal("")),
  website: z.string().trim().max(255).optional().or(z.literal("")),
});

const LETTER_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const PHOTO_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const MAX_SIZE = 10 * 1024 * 1024;

const NovaIndicacao = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [type, setType] = useState<NominationType>("figura");
  const [letter, setLetter] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [decls, setDecls] = useState([false, false, false]);
  const [busy, setBusy] = useState(false);

  const toggleDecl = (i: number, v: boolean) =>
    setDecls((prev) => prev.map((d, idx) => (idx === i ? v : d)));

  const upload = async (nominationId: string, file: File, fileType: string) => {
    const ext = file.name.split(".").pop();
    const path = `${user!.id}/${nominationId}/${fileType}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("nomination-files").upload(path, file);
    if (error) throw error;
    const { error: rowError } = await supabase.from("nomination_files").insert({
      nomination_id: nominationId,
      file_type: fileType,
      file_path: path,
      file_name: file.name,
    });
    if (rowError) throw rowError;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const form = new FormData(e.currentTarget);
    const values = Object.fromEntries(form.entries()) as Record<string, string>;

    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    if (!letter || !photo) {
      toast.error("A carta de apresentação e a fotografia oficial são obrigatórias.");
      return;
    }
    if (!LETTER_TYPES.includes(letter.type)) {
      toast.error("A carta deve estar em formato PDF, DOC ou DOCX.");
      return;
    }
    if (!PHOTO_TYPES.includes(photo.type)) {
      toast.error("A fotografia deve estar em formato JPG, JPEG ou PNG.");
      return;
    }
    if (letter.size > MAX_SIZE || photo.size > MAX_SIZE) {
      toast.error("Cada ficheiro deve ter no máximo 10 MB.");
      return;
    }
    if (!decls.every(Boolean)) {
      toast.error("Confirme as três declarações antes de submeter.");
      return;
    }

    setBusy(true);
    try {
      const payload: Record<string, string | null> = {};
      Object.entries(values).forEach(([k, v]) => {
        payload[k] = v.trim() === "" ? null : v.trim();
      });

      const { data, error } = await supabase
        .from("nominations")
        .insert({
          ...payload,
          nomination_code: "",
          nominee_name: parsed.data.nominee_name,
          justification: parsed.data.justification,
          nominee_type: type,
          indicator_id: user.id,
        })
        .select("id, nomination_code")
        .single();
      if (error) throw error;

      await upload(data.id, letter, "carta");
      await upload(data.id, photo, "fotografia");

      toast.success(`Indicação submetida com o código ${data.nomination_code}.`);
      navigate("/painel/indicacoes");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Não foi possível submeter a indicação.");
    } finally {
      setBusy(false);
    }
  };

  const text = (name: string, label: string, props: Record<string, unknown> = {}) => (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      <Input id={name} name={name} {...props} />
    </div>
  );

  const area = (name: string, label: string, rows = 4, required = false) => (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      <Textarea id={name} name={name} rows={rows} required={required} />
    </div>
  );

  const section = (title: string) => (
    <h2 className="font-heading text-lg text-foreground pt-4 border-t border-border/60">{title}</h2>
  );

  return (
    <PlatformLayout
      title="Indicar uma Figura ou Instituição"
      subtitle="Todos os campos assinalados com * são obrigatórios."
    >
      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            Tipo de indicação *
          </Label>
          <Select value={type} onValueChange={(v) => setType(v as NominationType)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(NOMINATION_TYPES).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {section("Dados do indicado")}
        <div className="grid md:grid-cols-2 gap-5">
          {text("nominee_name", "Nome completo *", { required: true })}
          {text("professional_name", "Nome profissional")}
          {text("gender", "Sexo")}
          {text("nationality", "Nacionalidade")}
          {text("country", "País de residência")}
          {text("province", "Província / Estado")}
          {text("city", "Cidade")}
          {text("profession", "Profissão")}
          {text("position", "Cargo atual")}
          {text("company", "Empresa / Instituição")}
          {text("sector", "Setor de atuação")}
          {text("category", "Categoria pretendida")}
          {text("email", "E-mail (se conhecido)", { type: "email" })}
          {text("phone", "Telefone (se conhecido)")}
          {text("linkedin", "LinkedIn")}
          {text("instagram", "Instagram")}
          {text("website", "Website")}
        </div>
        {area("biography", "Pequena biografia", 4)}

        {section("Justificação da indicação")}
        {area("justification", "Por que esta pessoa/instituição deve ser reconhecida? *", 6, true)}
        <div className="grid md:grid-cols-2 gap-5">
          {area("achievements", "Principais realizações", 3)}
          {area("social_impact", "Impacto social / profissional", 3)}
          {area("contribution_angola", "Contribuição para Angola", 3)}
          {area("contribution_international", "Contribuição internacional", 3)}
          {area("projects", "Projetos relevantes", 3)}
          {area("previous_awards", "Prémios e reconhecimentos anteriores", 3)}
        </div>

        {section("Documentos obrigatórios")}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="letter" className="text-xs uppercase tracking-wider text-muted-foreground">
              Carta de apresentação (PDF, DOC, DOCX) *
            </Label>
            <Input
              id="letter"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setLetter(e.target.files?.[0] ?? null)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="photo" className="text-xs uppercase tracking-wider text-muted-foreground">
              Fotografia oficial (JPG, JPEG, PNG) *
            </Label>
            <Input
              id="photo"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
            />
          </div>
        </div>

        {section("Declaração do Indicador")}
        <div className="space-y-4">
          {[
            "Confirmo que as informações apresentadas são verdadeiras segundo o meu conhecimento.",
            "Autorizo os Prémios Líderes Angola Global a contactar a pessoa/instituição indicada.",
            "Compreendo que uma indicação não significa automaticamente uma nomeação ou premiação.",
          ].map((label, i) => (
            <label key={i} className="flex items-start gap-3 text-sm text-muted-foreground font-body">
              <Checkbox
                checked={decls[i]}
                onCheckedChange={(v) => toggleDecl(i, v === true)}
                className="mt-0.5"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>

        <Button type="submit" disabled={busy} size="lg" className="w-full md:w-auto">
          {busy ? "A submeter…" : "SUBMETER INDICAÇÃO"}
        </Button>
      </form>
    </PlatformLayout>
  );
};

export default NovaIndicacao;
