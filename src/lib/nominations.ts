export const NOMINATION_STATUS = {
  submetida: "Submetida",
  recebida: "Recebida",
  em_verificacao: "Em verificação",
  em_analise: "Em análise",
  encaminhada_juri: "Encaminhada ao Júri",
  info_adicional: "Informação adicional solicitada",
  pre_selecionada: "Pré-selecionada",
  selecionada: "Selecionada",
  nao_selecionada: "Não selecionada",
  arquivada: "Arquivada",
} as const;

export type NominationStatus = keyof typeof NOMINATION_STATUS;

export const NOMINATION_TYPES = {
  figura: "Figura / Personalidade",
  empresa: "Empresa",
  instituicao: "Instituição",
  organizacao: "Organização",
  projeto: "Projeto",
} as const;

export type NominationType = keyof typeof NOMINATION_TYPES;

export const FILE_STATUS: Record<string, string> = {
  pendente: "Pendente",
  validado: "Validado",
  rejeitado: "Rejeitado",
};

export const fileStatusTone = (status: string) => {
  switch (status) {
    case "validado":
      return "border-primary/60 bg-primary/10 text-primary";
    case "rejeitado":
      return "border-destructive/40 bg-destructive/10 text-destructive";
    default:
      return "border-border bg-muted/40 text-muted-foreground";
  }
};

export const isEditable = (status: NominationStatus) =>
  status === "submetida" || status === "info_adicional";

export const statusTone = (status: NominationStatus) => {
  switch (status) {
    case "selecionada":
    case "pre_selecionada":
      return "border-primary/60 bg-primary/10 text-primary";
    case "nao_selecionada":
    case "arquivada":
      return "border-destructive/40 bg-destructive/10 text-destructive";
    case "info_adicional":
      return "border-secondary/40 bg-secondary/10 text-secondary";
    default:
      return "border-border bg-muted/40 text-muted-foreground";
  }
};
