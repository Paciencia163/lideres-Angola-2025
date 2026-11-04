import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Award, Check, User } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES, NOMINEES } from "@/lib/galaData";

const schema = z.object({
  name: z.string().trim().min(2, "Indique o seu nome").max(120),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().max(30).optional(),
});

const steps = ["Categoria", "Nomeado", "Confirmar"];

const Votar = () => {
  const [params] = useSearchParams();
  const initial = CATEGORIES.find((c) => c.slug === params.get("categoria"))?.slug ?? null;
  const [step, setStep] = useState(initial ? 1 : 0);
  const [category, setCategory] = useState<string | null>(initial);
  const [nominee, setNominee] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const cat = CATEGORIES.find((c) => c.slug === category);
  const nom = NOMINEES.find((n) => n.slug === nominee);

  const submit = async () => {
    const r = schema.safeParse(form);
    if (!r.success) return toast.error(r.error.issues[0].message);
    setLoading(true);
    const { error } = await supabase.from("votes").insert({
      category_slug: category!, nominee_slug: nominee!, voter_name: r.data.name, voter_email: r.data.email.toLowerCase(), voter_phone: r.data.phone || null,
    });
    setLoading(false);
    if (error) return toast.error(error.code === "23505" ? "Este email já votou nesta categoria." : "Não foi possível registar o voto. Tente novamente.");
    setDone(true);
  };

  const reset = () => { setDone(false); setStep(0); setCategory(null); setNominee(null); };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-5 pt-32 pb-24 max-w-4xl">
        <div className="text-center">
          <p className="eyebrow">Votação do público</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-heading">Vote no seu líder</h1>
        </div>

        {!done && (
          <ol className="mt-12 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em]">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                <span className={`w-8 h-8 flex items-center justify-center border ${i <= step ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>{i < step ? <Check size={14} /> : i + 1}</span>
                <span className={`hidden sm:inline ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
                {i < 2 && <span className="w-8 h-px bg-border" />}
              </li>
            ))}
          </ol>
        )}

        <AnimatePresence mode="wait">
          <motion.div key={done ? "done" : step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="mt-12">
            {done ? (
              <div className="text-center border border-primary/40 p-10 md:p-16">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }} className="w-20 h-20 mx-auto rounded-full border border-primary flex items-center justify-center">
                  <Check className="text-primary" size={36} />
                </motion.div>
                <h2 className="mt-8 text-3xl font-heading">Obrigado pelo seu voto</h2>
                <p className="mt-4 text-muted-foreground">O seu voto em <span className="text-foreground">{nom?.name}</span> ({cat?.name}) foi registado.</p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={reset} className="rounded-none uppercase tracking-[0.2em] text-xs h-12">Votar noutra categoria</Button>
                  <Button asChild variant="outline" className="rounded-none uppercase tracking-[0.2em] text-xs h-12 bg-transparent"><Link to="/">Voltar ao início</Link></Button>
                </div>
              </div>
            ) : step === 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {CATEGORIES.map((c) => (
                  <button key={c.slug} onClick={() => { setCategory(c.slug); setNominee(null); setStep(1); }}
                    className="text-left border border-border bg-card p-6 transition-all hover:border-primary/60 hover:-translate-y-0.5 min-h-[88px]">
                    <Award className="text-primary mb-3" size={20} strokeWidth={1.4} />
                    <p className="font-heading text-lg">{c.name}</p>
                  </button>
                ))}
              </div>
            ) : step === 1 ? (
              <div>
                <p className="text-center text-muted-foreground mb-8">{cat?.name}</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {NOMINEES.filter((n) => n.category === category).map((n) => (
                    <button key={n.slug} onClick={() => setNominee(n.slug)}
                      className={`border p-5 text-left transition-all ${nominee === n.slug ? "border-primary shadow-gold" : "border-border hover:border-primary/50"} bg-card`}>
                      <div className="aspect-square bg-muted flex items-center justify-center mb-4"><User className="text-muted-foreground/40" size={40} aria-label="Fotografia a adicionar" /></div>
                      <p className="font-heading">{n.name}</p>
                      <p className="text-sm text-muted-foreground">{n.company}</p>
                    </button>
                  ))}
                </div>
                <div className="mt-10 flex justify-between">
                  <Button variant="ghost" onClick={() => setStep(0)} className="rounded-none">← Categorias</Button>
                  <Button disabled={!nominee} onClick={() => setStep(2)} className="rounded-none uppercase tracking-[0.2em] text-xs h-12 px-8">Continuar</Button>
                </div>
              </div>
            ) : (
              <div className="max-w-lg mx-auto">
                <div className="border border-primary/30 p-6 mb-8">
                  <p className="eyebrow text-[0.6rem]">{cat?.name}</p>
                  <p className="mt-2 font-heading text-2xl">{nom?.name}</p>
                </div>
                <p className="text-sm text-muted-foreground mb-6">Para garantir um voto por pessoa em cada categoria, indique os seus dados.</p>
                <div className="space-y-5">
                  <div><Label htmlFor="n">Nome completo</Label><Input id="n" className="rounded-none h-12 mt-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                  <div><Label htmlFor="e">Email</Label><Input id="e" type="email" className="rounded-none h-12 mt-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                  <div><Label htmlFor="p">Telefone (opcional)</Label><Input id="p" type="tel" className="rounded-none h-12 mt-2" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
                </div>
                <div className="mt-10 flex justify-between">
                  <Button variant="ghost" onClick={() => setStep(1)} className="rounded-none">← Nomeados</Button>
                  <Button onClick={submit} disabled={loading} className="rounded-none uppercase tracking-[0.2em] text-xs h-12 px-8">{loading ? "A registar…" : "Confirmar voto"}</Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default Votar;
