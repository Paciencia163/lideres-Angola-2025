import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlatformLayout from "@/components/PlatformLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { NOMINATION_STATUS, NominationStatus, statusTone } from "@/lib/nominations";
import { FilePlus2 } from "lucide-react";

interface Row {
  id: string;
  nomination_code: string;
  nominee_name: string;
  status: NominationStatus;
  created_at: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!user) return;
    supabase
      .from("nominations")
      .select("id, nomination_code, nominee_name, status, created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => setRows((data ?? []) as Row[]));
    supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => setName(data?.full_name ?? ""));
  }, [user]);

  const count = (fn: (s: NominationStatus) => boolean) => rows.filter((r) => fn(r.status)).length;

  const stats = [
    { label: "Total de indicações", value: rows.length },
    {
      label: "Em análise",
      value: count((s) =>
        ["recebida", "em_verificacao", "em_analise", "encaminhada_juri", "pre_selecionada"].includes(s),
      ),
    },
    { label: "Aprovadas", value: count((s) => s === "selecionada") },
    { label: "Recusadas", value: count((s) => s === "nao_selecionada" || s === "arquivada") },
    { label: "Necessitam informação", value: count((s) => s === "info_adicional") },
  ];

  return (
    <PlatformLayout
      title={name ? `Bem-vindo, ${name.split(" ")[0]}` : "Painel do Indicador"}
      subtitle="Acompanhe o estado das suas indicações aos Prémios Líderes Angola Global."
    >
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="border border-border/60 rounded-lg p-5 bg-card/40">
            <p className="text-3xl font-heading text-primary">{s.value}</p>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mt-2">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="border border-border/60 rounded-lg p-6 md:p-8 bg-card/40 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-lg text-foreground">Indicar uma Figura ou Instituição</h2>
          <p className="text-sm text-muted-foreground font-body mt-1">
            Submeta uma nova indicação com carta de apresentação e fotografia oficial.
          </p>
        </div>
        <Button asChild>
          <Link to="/painel/nova-indicacao">
            <FilePlus2 className="w-4 h-4 mr-2" /> Nova indicação
          </Link>
        </Button>
      </div>

      <h2 className="font-heading text-lg text-foreground mb-4">Indicações recentes</h2>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground font-body border border-border/60 rounded-lg p-8 text-center">
          Ainda não submeteu nenhuma indicação.
        </p>
      ) : (
        <div className="space-y-3">
          {rows.slice(0, 5).map((r) => (
            <Link
              key={r.id}
              to="/painel/indicacoes"
              className="flex flex-wrap items-center justify-between gap-3 border border-border/60 rounded-lg px-5 py-4 bg-card/40 hover:border-primary/40 transition-colors"
            >
              <div>
                <p className="font-body text-foreground">{r.nominee_name}</p>
                <p className="text-xs text-muted-foreground font-mono mt-1">{r.nomination_code}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full border ${statusTone(r.status)}`}>
                {NOMINATION_STATUS[r.status]}
              </span>
            </Link>
          ))}
        </div>
      )}
    </PlatformLayout>
  );
};

export default Dashboard;
