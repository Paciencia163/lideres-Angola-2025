import { useCallback, useEffect, useState } from "react";
import PlatformLayout from "@/components/PlatformLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  NOMINATION_STATUS,
  NOMINATION_TYPES,
  NominationStatus,
  NominationType,
  FILE_STATUS,
  fileStatusTone,
  isEditable,
  statusTone,
} from "@/lib/nominations";
import { toast } from "sonner";
import { Download, Pencil, Trash2, Upload, AlertCircle } from "lucide-react";
import NominationTimeline from "@/components/NominationTimeline";

interface Nomination {
  id: string;
  nomination_code: string;
  nominee_name: string;
  nominee_type: NominationType;
  status: NominationStatus;
  category: string | null;
  email: string | null;
  phone: string | null;
  justification: string | null;
  created_at: string;
}

interface FileRow {
  id: string;
  nomination_id: string;
  file_type: string;
  file_name: string;
  file_path: string;
  status: string;
}

const MAX_SIZE = 10 * 1024 * 1024;

const MinhasIndicacoes = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState<Nomination[]>([]);
  const [files, setFiles] = useState<FileRow[]>([]);
  const [editing, setEditing] = useState<Nomination | null>(null);
  const [form, setForm] = useState({
    nominee_name: "",
    category: "",
    email: "",
    phone: "",
    justification: "",
  });
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("nominations")
      .select(
        "id, nomination_code, nominee_name, nominee_type, status, category, email, phone, justification, created_at",
      )
      .order("created_at", { ascending: false });
    setRows((data ?? []) as Nomination[]);
    const { data: f } = await supabase
      .from("nomination_files")
      .select("id, nomination_id, file_type, file_name, file_path, status");
    setFiles((f ?? []) as FileRow[]);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openFile = async (path: string) => {
    const { data, error } = await supabase.storage
      .from("nomination-files")
      .createSignedUrl(path, 300);
    if (error || !data) {
      toast.error("Não foi possível abrir o ficheiro.");
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  const startEdit = (r: Nomination) => {
    setEditing(r);
    setForm({
      nominee_name: r.nominee_name,
      category: r.category ?? "",
      email: r.email ?? "",
      phone: r.phone ?? "",
      justification: r.justification ?? "",
    });
  };

  const saveEdit = async () => {
    if (!editing) return;
    if (form.nominee_name.trim().length < 3) {
      toast.error("Indique o nome completo do indicado.");
      return;
    }
    if (form.justification.trim().length < 50) {
      toast.error("A justificação deve ter pelo menos 50 caracteres.");
      return;
    }
    setBusy(true);
    const { error } = await supabase
      .from("nominations")
      .update({
        nominee_name: form.nominee_name.trim(),
        category: form.category.trim() || null,
        email: form.email.trim() || null,
        phone: form.phone.trim() || null,
        justification: form.justification.trim(),
      })
      .eq("id", editing.id);
    setBusy(false);
    if (error) {
      toast.error("Não foi possível guardar as alterações.");
      return;
    }
    toast.success("Indicação actualizada.");
    setEditing(null);
    load();
  };

  const addFile = async (r: Nomination, file: File | null, fileType: string) => {
    if (!file || !user) return;
    if (file.size > MAX_SIZE) {
      toast.error("Cada ficheiro deve ter no máximo 10 MB.");
      return;
    }
    setBusy(true);
    const ext = file.name.split(".").pop();
    const path = `${user.id}/${r.id}/${fileType}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("nomination-files").upload(path, file);
    if (!error) {
      await supabase.from("nomination_files").insert({
        nomination_id: r.id,
        file_type: fileType,
        file_path: path,
        file_name: file.name,
      });
    }
    setBusy(false);
    if (error) {
      toast.error("Não foi possível carregar o ficheiro.");
      return;
    }
    toast.success("Documento adicionado.");
    load();
  };

  const removeFile = async (f: FileRow) => {
    setBusy(true);
    await supabase.storage.from("nomination-files").remove([f.file_path]);
    const { error } = await supabase.from("nomination_files").delete().eq("id", f.id);
    setBusy(false);
    if (error) {
      toast.error("Não foi possível remover o documento.");
      return;
    }
    toast.success("Documento removido.");
    load();
  };

  const resubmit = async (r: Nomination) => {
    setBusy(true);
    const { error } = await supabase
      .from("nominations")
      .update({ status: "submetida" })
      .eq("id", r.id);
    setBusy(false);
    if (error) {
      toast.error("Não foi possível reenviar a indicação.");
      return;
    }
    toast.success("Indicação reenviada para análise.");
    load();
  };

  return (
    <PlatformLayout
      title="Minhas Indicações"
      subtitle="Consulte o estado, actualize os dados e acompanhe a validação de cada indicação."
    >
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground font-body border border-border/60 rounded-lg p-8 text-center">
          Ainda não submeteu nenhuma indicação.
        </p>
      ) : (
        <Accordion type="single" collapsible className="space-y-3">
          {rows.map((r) => (
            <AccordionItem
              key={r.id}
              value={r.id}
              className="border border-border/60 rounded-lg px-5 bg-card/40"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-1 flex-wrap items-center justify-between gap-3 pr-4 text-left">
                  <div>
                    <p className="font-body text-foreground">{r.nominee_name}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">
                      {r.nomination_code} · {NOMINATION_TYPES[r.nominee_type]}
                    </p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full border ${statusTone(r.status)}`}>
                    {NOMINATION_STATUS[r.status]}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-5 pb-6">
                {r.status === "info_adicional" && (
                  <div className="flex items-start gap-3 rounded-md border border-secondary/40 bg-secondary/10 px-4 py-3">
                    <AlertCircle className="w-4 h-4 mt-0.5 text-secondary" />
                    <p className="text-sm font-body text-foreground">
                      A organização solicitou informação adicional. Actualize os dados ou carregue
                      novos documentos e reenvie a indicação para análise.
                    </p>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4 text-sm font-body">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Categoria</p>
                    <p className="text-foreground mt-1">{r.category ?? "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Data da indicação
                    </p>
                    <p className="text-foreground mt-1">
                      {new Date(r.created_at).toLocaleDateString("pt-PT")}
                    </p>
                  </div>
                </div>

                {r.justification && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                      Justificação
                    </p>
                    <p className="text-sm text-foreground font-body whitespace-pre-line">
                      {r.justification}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Documentos
                  </p>
                  <div className="space-y-2">
                    {files
                      .filter((f) => f.nomination_id === r.id)
                      .map((f) => (
                        <div
                          key={f.id}
                          className="flex items-center justify-between gap-3 border border-border/60 rounded-md px-4 py-2.5"
                        >
                          <div className="min-w-0">
                            <p className="text-sm text-foreground truncate">{f.file_name}</p>
                            <p className="text-xs text-muted-foreground capitalize">{f.file_type}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs px-2.5 py-1 rounded-full border ${fileStatusTone(f.status)}`}
                            >
                              {FILE_STATUS[f.status] ?? f.status}
                            </span>
                            <Button variant="ghost" size="sm" onClick={() => openFile(f.file_path)}>
                              <Download className="w-4 h-4" />
                            </Button>
                            {isEditable(r.status) && (
                              <Button
                                variant="ghost"
                                size="sm"
                                disabled={busy}
                                onClick={() => removeFile(f)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    {files.filter((f) => f.nomination_id === r.id).length === 0 && (
                      <p className="text-sm text-muted-foreground font-body">
                        Nenhum documento carregado.
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                    Histórico do processo
                  </p>
                  <NominationTimeline nominationId={r.id} />
                </div>

                {isEditable(r.status) && (
                  <div className="space-y-4 border-t border-border/60 pt-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                          <Upload className="w-3 h-3 inline mr-1" /> Nova carta / documento
                        </Label>
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          disabled={busy}
                          onChange={(e) => addFile(r, e.target.files?.[0] ?? null, "carta")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                          <Upload className="w-3 h-3 inline mr-1" /> Nova fotografia
                        </Label>
                        <Input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          disabled={busy}
                          onChange={(e) => addFile(r, e.target.files?.[0] ?? null, "fotografia")}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" size="sm" onClick={() => startEdit(r)}>
                        <Pencil className="w-4 h-4 mr-2" /> Editar dados
                      </Button>
                      {r.status === "info_adicional" && (
                        <Button size="sm" disabled={busy} onClick={() => resubmit(r)}>
                          Reenviar para análise
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl text-foreground">
              Editar indicação
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Nome do indicado
              </Label>
              <Input
                value={form.nominee_name}
                onChange={(e) => setForm({ ...form, nominee_name: e.target.value })}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Categoria
                </Label>
                <Input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Telefone
                </Label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                E-mail do indicado
              </Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Justificação
              </Label>
              <Textarea
                rows={6}
                value={form.justification}
                onChange={(e) => setForm({ ...form, justification: e.target.value })}
              />
            </div>
            <Button disabled={busy} onClick={saveEdit} className="w-full">
              {busy ? "A guardar…" : "Guardar alterações"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PlatformLayout>
  );
};

export default MinhasIndicacoes;
