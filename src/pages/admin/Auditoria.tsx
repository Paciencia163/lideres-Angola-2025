import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NOMINATION_STATUS, NominationStatus, FILE_STATUS } from "@/lib/nominations";
import {
  EVENT_LABELS,
  NominationEvent,
  eventLabel,
  eventTone,
  fieldLabel,
  formatDateTime,
  truncate,
} from "@/lib/nominationEvents";
import { toast } from "sonner";
import { LogOut, Download, Search, RotateCcw } from "lucide-react";

interface NominationRow {
  id: string;
  nomination_code: string;
  nominee_name: string;
  indicator_id: string;
}

interface ProfileRow {
  id: string;
  full_name: string;
  email: string | null;
}

const statusText = (value: string | null) =>
  value ? (NOMINATION_STATUS[value as NominationStatus] ?? value) : "—";

const Auditoria = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState<NominationEvent[]>([]);
  const [nominations, setNominations] = useState<NominationRow[]>([]);
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [filePaths, setFilePaths] = useState<Record<string, string>>({});
  const [candidate, setCandidate] = useState("todos");
  const [type, setType] = useState("todos");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    const [{ data: ev }, { data: noms }, { data: profs }, { data: files }] = await Promise.all([
      supabase
        .from("nomination_events")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1000),
      supabase.from("nominations").select("id, nomination_code, nominee_name, indicator_id"),
      supabase.from("profiles").select("id, full_name, email"),
      supabase.from("nomination_files").select("id, file_path"),
    ]);
    setEvents((ev ?? []) as NominationEvent[]);
    setNominations((noms ?? []) as NominationRow[]);
    setProfiles((profs ?? []) as ProfileRow[]);
    setFilePaths(
      Object.fromEntries(((files ?? []) as { id: string; file_path: string }[]).map((f) => [f.id, f.file_path])),
    );
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const nomById = useMemo(
    () => Object.fromEntries(nominations.map((n) => [n.id, n])),
    [nominations],
  );
  const profById = useMemo(() => Object.fromEntries(profiles.map((p) => [p.id, p])), [profiles]);

  const actorName = (id: string | null) => {
    if (!id) return "Sistema";
    const p = profById[id];
    return p?.full_name?.trim() || p?.email || "Utilizador";
  };

  const openFile = async (fileId: string) => {
    const path = filePaths[fileId];
    if (!path) {
      toast.error("O ficheiro já não está disponível.");
      return;
    }
    const { data, error } = await supabase.storage
      .from("nomination-files")
      .createSignedUrl(path, 300);
    if (error || !data) {
      toast.error("Não foi possível abrir o ficheiro.");
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  const filtered = events.filter((e) => {
    if (candidate !== "todos" && e.nomination_id !== candidate) return false;
    if (type !== "todos" && e.event_type !== type) return false;
    const created = new Date(e.created_at);
    if (from && created < new Date(`${from}T00:00:00`)) return false;
    if (to && created > new Date(`${to}T23:59:59`)) return false;
    const q = query.trim().toLowerCase();
    if (q) {
      const nom = nomById[e.nomination_id];
      const haystack = [
        nom?.nominee_name,
        nom?.nomination_code,
        actorName(e.actor_id),
        fieldLabel(e.field),
        e.old_value,
        e.new_value,
        e.file_name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  const describeValue = (e: NominationEvent, value: string | null) => {
    if (e.field === "status") return statusText(value);
    if (e.event_type === "documento_estado") return FILE_STATUS[value ?? ""] ?? value ?? "—";
    return truncate(value, 120);
  };

  const resetFilters = () => {
    setCandidate("todos");
    setType("todos");
    setFrom("");
    setTo("");
    setQuery("");
  };

  const exportCsv = () => {
    const header = ["Data", "Candidato", "Código", "Ação", "Campo", "Anterior", "Novo", "Utilizador", "Anexo"];
    const lines = filtered.map((e) => {
      const nom = nomById[e.nomination_id];
      return [
        formatDateTime(e.created_at),
        nom?.nominee_name ?? "",
        nom?.nomination_code ?? "",
        eventLabel(e.event_type),
        fieldLabel(e.field),
        describeValue(e, e.old_value),
        describeValue(e, e.new_value),
        actorName(e.actor_id),
        e.file_name ?? "",
      ]
        .map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`)
        .join(",");
    });
    const blob = new Blob([`\uFEFF${[header.join(","), ...lines].join("\n")}`], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `auditoria-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-card/40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="font-heading text-sm tracking-[0.2em] text-primary">
            LÍDERES ANGOLA · AUDITORIA
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/admin">Indicações</Link>
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
        <h1 className="text-2xl md:text-3xl font-heading text-foreground mb-2">
          Registo de Auditoria
        </h1>
        <p className="text-sm text-muted-foreground font-body mb-8">
          {filtered.length} movimentos registados · alterações campo a campo, autor e documentos
          associados.
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-6">
          <div className="space-y-2 lg:col-span-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Pesquisa</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Nome, código, utilizador, valor…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Candidato</Label>
            <Select value={candidate} onValueChange={setCandidate}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os candidatos</SelectItem>
                {nominations.map((n) => (
                  <SelectItem key={n.id} value={n.id}>
                    {n.nominee_name} · {n.nomination_code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">De</Label>
            <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Até</Label>
            <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-4 mb-8">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Tipo de acção
            </Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as acções</SelectItem>
                {Object.keys(EVENT_LABELS).map((k) => (
                  <SelectItem key={k} value={k}>
                    {EVENT_LABELS[k]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" onClick={resetFilters}>
            <RotateCcw className="w-4 h-4 mr-2" /> Limpar filtros
          </Button>
          <Button variant="outline" onClick={exportCsv}>
            <Download className="w-4 h-4 mr-2" /> Exportar CSV
          </Button>
        </div>

        <div className="space-y-3">
          {filtered.map((e) => {
            const nom = nomById[e.nomination_id];
            return (
              <div
                key={e.id}
                className="border border-border/60 rounded-lg px-5 py-4 bg-card/40 space-y-2"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[11px] px-2.5 py-0.5 rounded-full border ${eventTone(e.event_type)}`}
                  >
                    {eventLabel(e.event_type)}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {formatDateTime(e.created_at)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    por <span className="text-foreground">{actorName(e.actor_id)}</span>
                  </span>
                </div>

                <p className="font-body text-foreground text-sm">
                  {nom?.nominee_name ?? "Indicação removida"}{" "}
                  <span className="text-xs font-mono text-muted-foreground">
                    {nom?.nomination_code ?? ""}
                  </span>
                </p>

                {e.event_type !== "criada" && (
                  <div className="text-sm font-body grid sm:grid-cols-[180px_1fr] gap-1 sm:gap-3">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground sm:pt-0.5">
                      {fieldLabel(e.field)}
                    </span>
                    <span className="text-foreground break-words">
                      {e.event_type === "nota_interna" ? (
                        "Conteúdo interno actualizado"
                      ) : (
                        <>
                          <span className="text-muted-foreground line-through">
                            {describeValue(e, e.old_value)}
                          </span>{" "}
                          → {describeValue(e, e.new_value)}
                        </>
                      )}
                    </span>
                  </div>
                )}

                {e.file_id && (
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs text-muted-foreground">Anexo:</span>
                    <span className="text-sm text-foreground truncate">{e.file_name}</span>
                    {filePaths[e.file_id] ? (
                      <Button variant="ghost" size="sm" onClick={() => openFile(e.file_id!)}>
                        <Download className="w-4 h-4" />
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">(indisponível)</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground font-body border border-border/60 rounded-lg p-8 text-center">
              Nenhum movimento corresponde aos filtros seleccionados.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auditoria;
