import { useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Loader2, Send, User } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import PageHero from "@/components/sections/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { categories, getCategory } from "@/data/categories";
import { site } from "@/config/site";
import { sendForm } from "@/lib/forms";
import { useSeo } from "@/hooks/use-seo";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

type Tipo = "figura" | "instituicao";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const steps = [
  { title: "Indique", text: "Preencha o formulário com os dados da personalidade ou instituição." },
  { title: "Avaliação", text: "Cada indicação é avaliada por um júri especializado." },
  { title: "Anúncio", text: "Os nomeados oficiais são anunciados antes da gala." },
];

const labelCls = "block text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground";
const inputCls =
  "mt-2 h-12 w-full border-b border-input bg-transparent text-base normal-case tracking-normal text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none";

const nominationsClosed = !site.nominations.open || Date.now() > new Date(site.nominations.closesAt).getTime();

const Indicacao = () => {
  useSeo("Indicação", `Indique uma personalidade ou instituição para os ${site.name} ${site.edition}.`);
  const [params] = useSearchParams();
  const initialCategory = getCategory(params.get("categoria") ?? "")?.slug ?? "";

  const [tipo, setTipo] = useState<Tipo>("figura");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<null | "enviado" | "email">(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const next: Record<string, string> = {};
    if (!data.categoria) next.categoria = "Escolha uma categoria.";
    if (!data.indicado?.trim()) next.indicado = tipo === "figura" ? "Indique o nome da personalidade." : "Indique o nome da instituição.";
    if (!data.motivo?.trim() || data.motivo.trim().length < 20) next.motivo = "Descreva o motivo da indicação (mínimo 20 caracteres).";
    if (!data.proponente?.trim()) next.proponente = "Indique o seu nome.";
    if (!EMAIL_RE.test(data.email ?? "")) next.email = "Indique um e-mail válido.";
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    setBusy(true);
    try {
      const mode = await sendForm("indicacao", {
        tipo: tipo === "figura" ? "Figura" : "Instituição",
        categoria: getCategory(data.categoria)?.title ?? data.categoria,
        indicado: data.indicado.trim(),
        organizacao: data.organizacao?.trim() || "—",
        contactoDoIndicado: data.contactoIndicado?.trim() || "—",
        motivo: data.motivo.trim(),
        proponente: data.proponente.trim(),
        email: data.email.trim(),
        telefone: data.telefone?.trim() || "—",
      });
      setDone(mode);
      window.scrollTo({ top: 260, behavior: "smooth" });
    } catch {
      setErrors({ geral: "Não foi possível enviar a indicação. Tente novamente ou contacte-nos por WhatsApp." });
    } finally {
      setBusy(false);
    }
  };

  const err = (name: string) =>
    errors[name] ? (
      <span id={`${name}-erro`} role="alert" className="mt-2 block text-xs normal-case tracking-normal text-destructive">
        {errors[name]}
      </span>
    ) : null;

  return (
    <PageTransition>
      <PageHero
        eyebrow={`Indicações · ${site.edition}`}
        title={
          <>
            Indique um líder que <em className="text-primary">inspira</em> Angola
          </>
        }
        description="Conhece uma personalidade ou instituição que merece ser reconhecida? Faça a sua indicação para a edição deste ano."
      />

      <section className="section pt-12 md:pt-16">
        <div className="container-luxe grid gap-16 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <Stagger className="divide-y divide-primary/15 border-y border-primary/15">
              {steps.map((s, i) => (
                <StaggerItem key={s.title} className="py-6">
                  <span className="font-display text-sm text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-2 font-display text-xl text-foreground">{s.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal className="mt-8 text-sm leading-relaxed text-muted-foreground">
              Indicações abertas até{" "}
              <span className="text-foreground">
                {new Intl.DateTimeFormat("pt-AO", { day: "numeric", month: "long", timeZone: "Africa/Luanda" }).format(new Date(site.nominations.closesAt))}
              </span>
              . Dúvidas? Fale connosco por{" "}
              <a href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                WhatsApp
              </a>
              .
            </Reveal>
          </aside>

          <Reveal delay={0.1} className="border border-border bg-card p-6 sm:p-10 lg:col-span-8">
            {nominationsClosed ? (
              <div className="py-10 text-center">
                <h2 className="font-display text-3xl text-foreground">As indicações estão encerradas</h2>
                <p className="mt-4 text-muted-foreground">Obrigado a todos os que participaram. Conheça os nomeados oficiais.</p>
                <Button asChild variant="gold-outline" className="mt-8">
                  <Link to="/nomeados">Ver nomeados</Link>
                </Button>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div key="ok" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } }} className="py-10 text-center">
                    <div className="relative mx-auto h-20 w-20">
                      <motion.span
                        className="absolute inset-0 rounded-full border border-primary"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: [0.6, 1.5], opacity: [0.8, 0] }}
                        transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
                      />
                      <motion.span
                        className="absolute inset-0 flex items-center justify-center rounded-full bg-primary text-primary-foreground"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      >
                        <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.35, ease: EASE }} />
                        </svg>
                      </motion.span>
                    </div>
                    <h2 className="mt-10 font-display text-3xl text-foreground md:text-4xl">Obrigado pela sua indicação</h2>
                    <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                      {done === "enviado"
                        ? "A sua indicação foi recebida e será avaliada pelo júri."
                        : "Abrimos o seu e-mail com a indicação preenchida — basta enviar para concluir."}
                    </p>
                    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
                      <Button variant="gold" size="lg" onClick={() => setDone(null)}>
                        Fazer outra indicação
                      </Button>
                      <Button asChild variant="gold-outline" size="lg">
                        <Link to="/categorias">Ver categorias</Link>
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h2 className="font-display text-3xl text-foreground">Formulário de indicação</h2>
                    <p className="mt-2 text-sm text-muted-foreground">Os campos assinalados com * são obrigatórios.</p>

                    <fieldset className="mt-10">
                      <legend className="eyebrow mb-5">1 · O indicado</legend>
                      <div className="grid grid-cols-2 gap-px border border-border bg-border" role="radiogroup" aria-label="Tipo de indicado">
                        {(
                          [
                            { v: "figura", label: "Personalidade", icon: User },
                            { v: "instituicao", label: "Instituição", icon: Building2 },
                          ] as const
                        ).map(({ v, label, icon: Icon }) => (
                          <button
                            key={v}
                            type="button"
                            role="radio"
                            aria-checked={tipo === v}
                            onClick={() => setTipo(v)}
                            className={cn(
                              "flex h-12 items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] transition-colors",
                              tipo === v ? "bg-primary text-primary-foreground" : "bg-background text-foreground/75 hover:text-foreground",
                            )}
                          >
                            <Icon className="h-4 w-4" /> {label}
                          </button>
                        ))}
                      </div>

                      <div className="mt-8 grid gap-8 sm:grid-cols-2">
                        <label className={cn(labelCls, "sm:col-span-2")}>
                          Categoria *
                          <select
                            name="categoria"
                            defaultValue={initialCategory}
                            aria-invalid={!!errors.categoria}
                            aria-describedby={errors.categoria ? "categoria-erro" : undefined}
                            className={cn(inputCls, "appearance-none")}
                          >
                            <option value="" disabled className="bg-card">
                              Escolha uma categoria
                            </option>
                            {categories.map((c) => (
                              <option key={c.slug} value={c.slug} className="bg-card">
                                {c.title}
                              </option>
                            ))}
                          </select>
                          {err("categoria")}
                        </label>
                        <label className={labelCls}>
                          {tipo === "figura" ? "Nome da personalidade *" : "Nome da instituição *"}
                          <input name="indicado" aria-invalid={!!errors.indicado} aria-describedby={errors.indicado ? "indicado-erro" : undefined} className={inputCls} />
                          {err("indicado")}
                        </label>
                        <label className={labelCls}>
                          {tipo === "figura" ? "Cargo / Organização" : "Sector de actividade"}
                          <input name="organizacao" className={inputCls} />
                        </label>
                        <label className={cn(labelCls, "sm:col-span-2")}>
                          Contacto do indicado (opcional)
                          <input name="contactoIndicado" placeholder="E-mail, telefone ou rede social" className={inputCls} />
                        </label>
                        <label className={cn(labelCls, "sm:col-span-2")}>
                          Motivo da indicação *
                          <textarea
                            name="motivo"
                            rows={5}
                            placeholder="Descreva o impacto, as conquistas e a liderança que justificam esta indicação."
                            aria-invalid={!!errors.motivo}
                            aria-describedby={errors.motivo ? "motivo-erro" : undefined}
                            className={cn(inputCls, "h-auto resize-none py-3")}
                          />
                          {err("motivo")}
                        </label>
                      </div>
                    </fieldset>

                    <fieldset className="mt-12">
                      <legend className="eyebrow mb-5">2 · Os seus dados</legend>
                      <div className="grid gap-8 sm:grid-cols-2">
                        <label className={cn(labelCls, "sm:col-span-2")}>
                          O seu nome *
                          <input name="proponente" autoComplete="name" aria-invalid={!!errors.proponente} aria-describedby={errors.proponente ? "proponente-erro" : undefined} className={inputCls} />
                          {err("proponente")}
                        </label>
                        <label className={labelCls}>
                          E-mail *
                          <input name="email" type="email" inputMode="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-erro" : undefined} className={inputCls} />
                          {err("email")}
                        </label>
                        <label className={labelCls}>
                          Telefone
                          <input name="telefone" type="tel" inputMode="tel" autoComplete="tel" placeholder="9XX XXX XXX" className={inputCls} />
                        </label>
                      </div>
                    </fieldset>

                    {errors.geral && (
                      <p role="alert" className="mt-8 text-sm text-destructive">
                        {errors.geral}
                      </p>
                    )}

                    <Button type="submit" variant="gold" size="lg" disabled={busy} className="mt-12 w-full sm:w-auto">
                      {busy ? <Loader2 className="animate-spin" /> : <Send />}
                      {busy ? "A enviar…" : "Enviar indicação"}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            )}
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
};

export default Indicacao;
