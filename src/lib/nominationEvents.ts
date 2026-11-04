export interface NominationEvent {
  id: string;
  nomination_id: string;
  actor_id: string | null;
  event_type: string;
  field: string | null;
  old_value: string | null;
  new_value: string | null;
  file_id: string | null;
  file_name: string | null;
  created_at: string;
}

export const FIELD_LABELS: Record<string, string> = {
  status: "Estado do processo",
  nominee_name: "Nome do indicado",
  professional_name: "Nome profissional",
  category: "Categoria",
  nominee_type: "Tipo de indicação",
  email: "E-mail",
  phone: "Telefone",
  justification: "Justificação",
  biography: "Biografia",
  achievements: "Realizações",
  social_impact: "Impacto social",
  contribution_angola: "Contribuição para Angola",
  contribution_international: "Contribuição internacional",
  projects: "Projectos",
  previous_awards: "Prémios anteriores",
  company: "Empresa",
  position: "Cargo",
  sector: "Sector",
  city: "Cidade",
  province: "Província",
  country: "País",
  admin_notes: "Notas internas",
  carta: "Carta de apresentação",
  fotografia: "Fotografia",
};

export const fieldLabel = (field: string | null) =>
  field ? (FIELD_LABELS[field] ?? field) : "—";

export const EVENT_LABELS: Record<string, string> = {
  criada: "Indicação submetida",
  estado: "Alteração de estado",
  edicao: "Edição de dados",
  nota_interna: "Nota interna actualizada",
  documento_adicionado: "Documento carregado",
  documento_estado: "Validação de documento",
  documento_removido: "Documento removido",
};

export const eventLabel = (type: string) => EVENT_LABELS[type] ?? type;

export const eventTone = (type: string) => {
  switch (type) {
    case "criada":
    case "documento_adicionado":
      return "border-primary/60 bg-primary/10 text-primary";
    case "documento_removido":
      return "border-destructive/40 bg-destructive/10 text-destructive";
    case "estado":
    case "documento_estado":
      return "border-secondary/40 bg-secondary/10 text-secondary";
    default:
      return "border-border bg-muted/40 text-muted-foreground";
  }
};

export const truncate = (value: string | null, max = 140) => {
  if (!value) return "—";
  return value.length > max ? `${value.slice(0, max)}…` : value;
};

export const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
