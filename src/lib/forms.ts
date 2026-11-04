import { site } from "@/config/site";

/**
 * Envio de formulários.
 * Defina VITE_FORMS_ENDPOINT para enviar para um serviço próprio (POST JSON).
 * Sem endpoint, o site abre o e-mail do visitante já preenchido para a organização.
 */
const ENDPOINT = import.meta.env.VITE_FORMS_ENDPOINT as string | undefined;

type FormKind = "newsletter" | "contacto" | "indicacao";

const subjects: Record<FormKind, (data: Record<string, string>) => string> = {
  newsletter: () => `Subscrição da newsletter — ${site.name} ${site.edition}`,
  contacto: (data) => `Contacto pelo site — ${data.assunto ?? site.name}`,
  indicacao: (data) => `Indicação ${site.edition} — ${data.categoria}: ${data.indicado}`,
};

export async function sendForm(kind: FormKind, data: Record<string, string>): Promise<"enviado" | "email"> {
  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, ...data }),
    });
    if (!res.ok) throw new Error(`Falha no envio (${res.status})`);
    return "enviado";
  }

  const subject = subjects[kind](data);
  const body = Object.entries(data)
    .map(([k, v]) => `${k.charAt(0).toUpperCase()}${k.slice(1)}: ${v}`)
    .join("\n");
  window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return "email";
}
