import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = ({
  children,
  staffOnly = false,
}: {
  children: ReactNode;
  staffOnly?: boolean;
}) => {
  const { user, loading, isStaff, roles } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground font-body text-sm">A carregar…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/entrar" state={{ from: location.pathname }} replace />;
  }

  if (staffOnly && roles.length > 0 && !isStaff) {
    return <Navigate to="/painel" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
