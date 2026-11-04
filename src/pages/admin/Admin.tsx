import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  statusTone,
} from "@/lib/nominations";
import { toast } from "sonner";
import { LogOut, Download, Search, Check, X } from "lucide-react";

interface Nomination {
  id: string;
  nomination_code: string;
  nominee_name: string;
  nominee_type: NominationType;
  status: NominationStatus;
  category: string | null;
  justification: string | null;
  biography: string | null;
  achievements: string | null;
  social_impact: string | null;
  contribution_angola: string | null;
  email: string | null;
  phone: string | null;
  admin_notes: string | null;
  indicator_id: string;
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

const Admin = () => {
  const { user, signOut, isStaff, roles, loading } = useAuth();
  const navigate = useNavigate();
  const [rows, setRows] = useState<Nomination[]>([]);
  const [files, setFiles] = useState<FileRow[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("todas");
  const [active, setActive] = useState<Nomination | null>(null);
  const [notes, setNotes] = useState("");

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("nominations")
      .select("*")
      .order("created_at", { ascending: false });
    setRows((data ?? []) as Nomination[]);
    const { data: f } = await supabase
      .from("nomination_files")
      .select("id, nomination_id, file_type, file_name, file_path, status");
    setFiles((f ?? []) as FileRow[]);
  }, []);

  useEffect(() => {
    if (isStaff) load();
  }, [isStaff, load]);

  const changeStatus = async (row: Nomination, status: NominationStatus) => {
    const { error } = await supabase.from("nominations").update({ status }).eq("id", row.id);
    if (error) {
      toast.error("Não foi possível alterar o estado.");
      return;
    }
    await supabase.from("audit_logs").insert({
      user_id: user!.id,
      action: "alterou_estado",
      entity: "nominations",
      entity_id: row.id,
      old_value: NOMINATION_STATUS[row.status],
      new_value: NOMINATION_STATUS[status],
    });
    toast.success(`Estado alterado para "${NOMINATION_STATUS[status]}".`);
    setActive((prev) => (prev ? { ...prev, status } : prev));
    load();
  };

  const saveNotes = async () => {
    if (!active) return;
    const { error } = await supabase
      .from("nominations")
      .update({ admin_notes: notes })
      .eq("id", active.id);
    if (error) {
      toast.error("Não foi possível guardar as notas.");
      return;
    }
    toast.success("Notas internas guardadas.");
    load();
  };

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

  const setFileStatus = async (file: FileRow, status: string) => {
    const { error } = await supabase
      .from("nomination_files")
      .update({ status })
      .eq("id", file.id);
    if (error) {
      toast.error("Não foi possível validar o documento.");
      return;
    }
    await supabase.from("audit_logs").insert({
      user_id: user!.id,
      action: "validou_documento",
      entity: "nomination_files",
      entity_id: file.id,
      old_value: file.status,
      new_value: status,
    });
    toast.success(status === "validado" ? "Documento validado." : "Documento rejeitado.");
    load();
  };

  if (loading || (roles.length === 0 && !isStaff)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground font-body text-sm">A verificar permissões…</p>
      </div>
    );
  }

  if (!isStaff) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background px-4 text-center">
        <h1 className="font-heading text-2xl text-foreground">Acesso restrito</h1>
        <p className="text-sm text-muted-foreground font-body max-w-md">
          Esta área é reservada à administração dos Prémios Líderes Angola Global.
        </p>
        <Button asChild variant="outline">
          <Link to="/painel">Voltar ao meu painel</Link>
        </Button>
      </div>
    );
  }

  const filtered = rows.filter((r) => {
    const matchStatus = filter === "todas" || r.status === filter;
    const q = query.trim().toLowerCase();
    const matchQuery =
      q === "" ||
      r.nominee_name.toLowerCase().includes(q) ||
      r.nomination_code.toLowerCase().includes(q);
    return matchStatus && matchQuery;
  });

  const counts = (Object.keys(NOMINATION_STATUS) as NominationStatus[]).map((s) => ({
    status: s,
    total: rows.filter((r) => r.status === s).length,
  }));

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-card/40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="font-heading text-sm tracking-[0.2em] text-primary">
            LÍDERES ANGOLA · ADMINISTRAÇÃO
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/admin/conteudos">Categorias & Nomeados</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link to="/admin/auditoria">Auditoria</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link to="/painel">Meu painel</Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                await signOut();
                navigate("/");
              }}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl md:text-3xl font-heading text-foreground mb-2">Gestão de Indicações</h1>
        <p className="text-sm text-muted-foreground font-body mb-8">
          {rows.length} indicações registadas nesta edição.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {counts
            .filter((c) => c.total > 0)
            .map((c) => (
              <div key={c.status} className="border border-border/60 rounded-lg p-4 bg-card/40">
                <p className="text-2xl font-heading text-primary">{c.total}</p>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">
                  {NOMINATION_STATUS[c.status]}
                </p>
              </div>
            ))}
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Procurar por nome ou código…"
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="md:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todos os estados</SelectItem>
              {(Object.keys(NOMINATION_STATUS) as NominationStatus[]).map((s) => (
                <SelectItem key={s} value={s}>
                  {NOMINATION_STATUS[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          {filtered.map((r) => (
            <div
              key={r.id}
              className="flex flex-wrap items-center justify-between gap-4 border border-border/60 rounded-lg px-5 py-4 bg-card/40"
            >
              <div className="min-w-0">
                <p className="font-body text-foreground">{r.nominee_name}</p>
                <p className="text-xs text-muted-foreground font-mono mt-1">
                  {r.nomination_code} · {NOMINATION_TYPES[r.nominee_type]} ·{" "}
                  {new Date(r.created_at).toLocaleDateString("pt-PT")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-3 py-1 rounded-full border ${statusTone(r.status)}`}>
                  {NOMINATION_STATUS[r.status]}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setActive(r);
                    setNotes(r.admin_notes ?? "");
                  }}
                >
                  Analisar
                </Button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground font-body border border-border/60 rounded-lg p-8 text-center">
              Nenhuma indicação corresponde aos filtros.
            </p>
          )}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-xl text-foreground">
                  {active.nominee_name}
                </DialogTitle>
                <p className="text-xs font-mono text-muted-foreground">{active.nomination_code}</p>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                    Estado do processo
                  </Label>
                  <Select
                    value={active.status}
                    onValueChange={(v) => changeStatus(active, v as NominationStatus)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(NOMINATION_STATUS) as NominationStatus[]).map((s) => (
                        <SelectItem key={s} value={s}>
                          {NOMINATION_STATUS[s]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {[
                  ["Justificação", active.justification],
                  ["Biografia", active.biography],
                  ["Realizações", active.achievements],
                  ["Impacto", active.social_impact],
                  ["Contribuição para Angola", active.contribution_angola],
                ]
                  .filter(([, v]) => v)
                  .map(([label, value]) => (
                    <div key={label as string}>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        {label}
                      </p>
                      <p className="text-sm text-foreground font-body whitespace-pre-line">{value}</p>
                    </div>
                  ))}

                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Documentos
                  </p>
                  <div className="space-y-2">
                    {files
                      .filter((f) => f.nomination_id === active.id)
                      .map((f) => (
                        <div
                          key={f.id}
                          className="flex flex-wrap items-center justify-between gap-3 border border-border/60 rounded-md px-4 py-2.5"
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
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setFileStatus(f, "validado")}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setFileStatus(f, "rejeitado")}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    {files.filter((f) => f.nomination_id === active.id).length === 0 && (
                      <p className="text-sm text-muted-foreground font-body">
                        Nenhum documento carregado.
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                    Notas internas (não visíveis ao Indicador)
                  </Label>
                  <Textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} />
                  <Button size="sm" onClick={saveNotes}>
                    Guardar notas
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
