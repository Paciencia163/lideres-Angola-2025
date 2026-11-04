import { ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FilePlus2,
  ListChecks,
  UserRound,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PlatformLayout = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) => {
  const { signOut, isStaff } = useAuth();
  const navigate = useNavigate();

  const links = [
    { to: "/painel", label: "Resumo", icon: LayoutDashboard, end: true },
    { to: "/painel/nova-indicacao", label: "Nova Indicação", icon: FilePlus2 },
    { to: "/painel/indicacoes", label: "Minhas Indicações", icon: ListChecks },
    { to: "/painel/perfil", label: "Meu Perfil", icon: UserRound },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-card/40 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="font-heading text-sm md:text-base tracking-[0.2em] text-primary">
            LÍDERES ANGOLA
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
              await signOut();
              navigate("/");
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" /> Terminar sessão
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 grid lg:grid-cols-[240px_1fr] gap-8">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-body whitespace-nowrap transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
                  )
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
            {isStaff && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-body whitespace-nowrap transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
                  )
                }
              >
                <ShieldCheck className="w-4 h-4" />
                Administração
              </NavLink>
            )}
          </nav>
        </aside>

        <main>
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-heading text-foreground">{title}</h1>
            {subtitle && (
              <p className="text-muted-foreground font-body text-sm mt-2">{subtitle}</p>
            )}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default PlatformLayout;
