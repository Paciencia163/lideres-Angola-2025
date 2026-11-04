import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { NOMINATION_STATUS, NominationStatus } from "@/lib/nominations";
import { FILE_STATUS } from "@/lib/nominations";
import {
  NominationEvent,
  eventLabel,
  eventTone,
  fieldLabel,
  formatDateTime,
  truncate,
} from "@/lib/nominationEvents";

const statusText = (value: string | null) =>
  value ? (NOMINATION_STATUS[value as NominationStatus] ?? value) : "—";

const describe = (e: NominationEvent) => {
  switch (e.event_type) {
    case "criada":
      return `Indicação registada com o estado "${statusText(e.new_value)}".`;
    case "estado":
      return `${statusText(e.old_value)} → ${statusText(e.new_value)}`;
    case "edicao":
      return `${fieldLabel(e.field)}: "${truncate(e.old_value, 60)}" → "${truncate(e.new_value, 60)}"`;
    case "nota_interna":
      return "A organização registou uma nota interna.";
    case "documento_adicionado":
      return `${fieldLabel(e.field)} — ${e.file_name ?? "documento"}`;
    case "documento_estado":
      return `${e.file_name ?? "Documento"}: ${FILE_STATUS[e.old_value ?? ""] ?? e.old_value} → ${
        FILE_STATUS[e.new_value ?? ""] ?? e.new_value
      }`;
    case "documento_removido":
      return `${e.file_name ?? "Documento"} foi removido.`;
    default:
      return "";
  }
};

const NominationTimeline = ({ nominationId }: { nominationId: string }) => {
  const [events, setEvents] = useState<NominationEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    supabase
      .from("nomination_events")
      .select("*")
      .eq("nomination_id", nominationId)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (!active) return;
        setEvents((data ?? []) as NominationEvent[]);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [nominationId]);

  if (loading) {
    return <p className="text-sm text-muted-foreground font-body">A carregar histórico…</p>;
  }

  if (events.length === 0) {
    return (
      <p className="text-sm text-muted-foreground font-body">
        Ainda não há movimentos registados nesta indicação.
      </p>
    );
  }

  return (
    <ol className="relative border-l border-border/60 pl-6 space-y-5">
      {events.map((e) => (
        <li key={e.id} className="relative">
          <span className="absolute -left-[27px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background" />
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[11px] px-2.5 py-0.5 rounded-full border ${eventTone(e.event_type)}`}>
              {eventLabel(e.event_type)}
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              {formatDateTime(e.created_at)}
            </span>
          </div>
          <p className="text-sm text-foreground font-body mt-1.5 break-words">{describe(e)}</p>
        </li>
      ))}
    </ol>
  );
};

export default NominationTimeline;
