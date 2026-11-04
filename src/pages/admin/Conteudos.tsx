import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { slugify } from "@/lib/galaData";
import { toast } from "sonner";
import { Pencil, Plus, Trash2, User } from "lucide-react";

interface Category { id: string; name: string; slug: string; description: string | null; sort_order: number }
interface Nominee { id: string; name: string; slug: string; category_id: string; description: string | null; image_url: string | null }

const emptyCat = { id: "", name: "", description: "" };
const emptyNom = { id: "", name: "", category_id: "", description: "", image_url: "" };

const Conteudos = () => {
  const [cats, setCats] = useState<Category[]>([]);
  const [noms, setNoms] = useState<Nominee[]>([]);
  const [catForm, setCatForm] = useState<typeof emptyCat | null>(null);
  const [nomForm, setNomForm] = useState<typeof emptyNom | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [filter, setFilter] = useState("todas");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const { data: c } = await supabase.from("categories").select("*").order("sort_order");
    const { data: n } = await supabase.from("nominees").select("*").order("name");
    setCats((c ?? []) as Category[]);
    setNoms((n ?? []) as Nominee[]);
  }, []);
  useEffect(() => { load(); }, [load]);

  const saveCat = async () => {
    if (!catForm || catForm.name.trim().length < 2) return toast.error("Indique o nome da categoria.");
    setSaving(true);
    const payload = { name: catForm.name.trim(), description: catForm.description || null, slug: slugify(catForm.name) };
    const { error } = catForm.id
      ? await supabase.from("categories").update(payload).eq("id", catForm.id)
      : await supabase.from("categories").insert({ ...payload, sort_order: cats.length + 1 });
    setSaving(false);
    if (error) return toast.error(error.code === "23505" ? "Já existe uma categoria com esse nome." : "Erro ao guardar.");
    toast.success("Categoria guardada.");
    setCatForm(null);
    load();
  };

  const saveNom = async () => {
    if (!nomForm || nomForm.name.trim().length < 2) return toast.error("Indique o nome do nomeado.");
    if (!nomForm.category_id) return toast.error("Escolha a categoria.");
    setSaving(true);
    let image_url = nomForm.image_url || null;
    if (file) {
      if (file.size > 5 * 1024 * 1024) { setSaving(false); return toast.error("Imagem máx. 5MB."); }
      const path = `${crypto.randomUUID()}.${file.name.split(".").pop()}`;
      const up = await supabase.storage.from("nominee-images").upload(path, file);
      if (up.error) { setSaving(false); return toast.error("Falha no envio da imagem."); }
      const { data } = await supabase.storage.from("nominee-images").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
      image_url = data?.signedUrl ?? null;
    }
    const base = slugify(nomForm.name);
    const payload = { name: nomForm.name.trim(), category_id: nomForm.category_id, description: nomForm.description || null, image_url };
    const { error } = nomForm.id
      ? await supabase.from("nominees").update(payload).eq("id", nomForm.id)
      : await supabase.from("nominees").insert({ ...payload, slug: `${base}-${Math.random().toString(36).slice(2, 6)}` });
    setSaving(false);
    if (error) return toast.error("Erro ao guardar nomeado.");
    toast.success("Nomeado guardado.");
    setNomForm(null); setFile(null);
    load();
  };

  const remove = async (table: "categories" | "nominees", id: string) => {
    if (!confirm(table === "categories" ? "Apagar categoria e todos os seus nomeados?" : "Apagar nomeado?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) return toast.error("Não foi possível apagar.");
    toast.success("Apagado.");
    load();
  };

  const shown = filter === "todas" ? noms : noms.filter((n) => n.category_id === filter);
  const catName = (id: string) => cats.find((c) => c.id === id)?.name ?? "—";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/admin" className="font-heading text-sm tracking-[0.2em] text-primary">← ADMINISTRAÇÃO</Link>
          <span className="text-sm text-muted-foreground">Categorias & Nomeados</span>
        </div>
      </header>
      <main className="container mx-auto px-6 py-10 grid lg:grid-cols-[1fr_2fr] gap-10">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-2xl">Categorias</h2>
            <Button size="sm" onClick={() => setCatForm({ ...emptyCat })}><Plus className="w-4 h-4 mr-1" />Nova</Button>
          </div>
          <ul className="space-y-2">
            {cats.map((c) => (
              <li key={c.id} className="border border-border rounded-md p-3 flex justify-between gap-2">
                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{noms.filter((n) => n.category_id === c.id).length} nomeados</p>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => setCatForm({ id: c.id, name: c.name, description: c.description ?? "" })}><Pencil className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => remove("categories", c.id)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <h2 className="font-heading text-2xl">Nomeados</h2>
            <div className="flex gap-2">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as categorias</SelectItem>
                  {cats.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button size="sm" onClick={() => { setFile(null); setNomForm({ ...emptyNom, category_id: filter === "todas" ? "" : filter }); }}><Plus className="w-4 h-4 mr-1" />Novo</Button>
            </div>
          </div>
          {shown.length === 0 && <p className="text-muted-foreground text-sm">Ainda não há nomeados.</p>}
          <div className="grid sm:grid-cols-2 gap-4">
            {shown.map((n) => (
              <div key={n.id} className="border border-border rounded-md overflow-hidden">
                <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                  {n.image_url ? <img src={n.image_url} alt={n.name} className="w-full h-full object-cover" /> : <User className="w-10 h-10 text-muted-foreground" />}
                </div>
                <div className="p-3">
                  <p className="font-medium">{n.name}</p>
                  <p className="text-xs text-primary">{catName(n.category_id)}</p>
                  {n.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{n.description}</p>}
                  <div className="flex gap-1 mt-2">
                    <Button size="sm" variant="outline" onClick={() => { setFile(null); setNomForm({ id: n.id, name: n.name, category_id: n.category_id, description: n.description ?? "", image_url: n.image_url ?? "" }); }}><Pencil className="w-3 h-3 mr-1" />Editar</Button>
                    <Button size="sm" variant="ghost" onClick={() => remove("nominees", n.id)}><Trash2 className="w-3 h-3" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Dialog open={!!catForm} onOpenChange={(o) => !o && setCatForm(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{catForm?.id ? "Editar categoria" : "Nova categoria"}</DialogTitle></DialogHeader>
          {catForm && (
            <div className="space-y-3">
              <div><Label>Nome</Label><Input value={catForm.name} onChange={(e) => setCatForm({ ...catForm, name: e.target.value })} /></div>
              <div><Label>Descrição</Label><Textarea value={catForm.description} onChange={(e) => setCatForm({ ...catForm, description: e.target.value })} /></div>
              <Button onClick={saveCat} disabled={saving} className="w-full">Guardar</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!nomForm} onOpenChange={(o) => !o && setNomForm(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{nomForm?.id ? "Editar nomeado" : "Novo nomeado"}</DialogTitle></DialogHeader>
          {nomForm && (
            <div className="space-y-3">
              <div><Label>Imagem</Label><Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
                {nomForm.image_url && !file && <img src={nomForm.image_url} alt="" className="mt-2 h-20 rounded object-cover" />}</div>
              <div><Label>Nome</Label><Input value={nomForm.name} onChange={(e) => setNomForm({ ...nomForm, name: e.target.value })} /></div>
              <div><Label>Categoria</Label>
                <Select value={nomForm.category_id} onValueChange={(v) => setNomForm({ ...nomForm, category_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Escolha" /></SelectTrigger>
                  <SelectContent>{cats.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                </Select></div>
              <div><Label>Descrição</Label><Textarea rows={4} value={nomForm.description} onChange={(e) => setNomForm({ ...nomForm, description: e.target.value })} /></div>
              <Button onClick={saveNom} disabled={saving} className="w-full">{saving ? "A guardar…" : "Guardar"}</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Conteudos;
