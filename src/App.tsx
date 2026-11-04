import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import { site } from "@/config/site";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";

const Sobre = lazy(() => import("./pages/Sobre"));
const Categorias = lazy(() => import("./pages/Categorias"));
const Nomeados = lazy(() => import("./pages/Nomeados"));
const Indicacao = lazy(() => import("./pages/Indicacao"));
const Vencedores = lazy(() => import("./pages/Vencedores"));
const Galeria = lazy(() => import("./pages/Galeria"));
const Patrocinadores = lazy(() => import("./pages/Patrocinadores"));
const Ingressos = lazy(() => import("./pages/Ingressos"));
const Edicao = lazy(() => import("./pages/Edicao"));
const Contactos = lazy(() => import("./pages/Contactos"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/painel/Dashboard"));
const NovaIndicacao = lazy(() => import("./pages/painel/NovaIndicacao"));
const MinhasIndicacoes = lazy(() => import("./pages/painel/MinhasIndicacoes"));
const Perfil = lazy(() => import("./pages/painel/Perfil"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const Auditoria = lazy(() => import("./pages/admin/Auditoria"));
const Conteudos = lazy(() => import("./pages/admin/Conteudos"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<div className="min-h-[100svh]" />}>
      <AnimatePresence mode="wait" onExitComplete={() => !location.hash && window.scrollTo(0, 0)}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/nomeados" element={<Nomeados />} />
          <Route path="/indicacao" element={<Indicacao />} />
          <Route path="/vencedores" element={<Vencedores />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/patrocinadores" element={<Patrocinadores />} />
          <Route path="/ingressos" element={<Ingressos />} />
          <Route path={`/edicao-${site.edition}`} element={<Edicao />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/entrar" element={<Auth />} />
          <Route
            path="/painel"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/painel/nova-indicacao"
            element={
              <ProtectedRoute>
                <NovaIndicacao />
              </ProtectedRoute>
            }
          />
          <Route
            path="/painel/indicacoes"
            element={
              <ProtectedRoute>
                <MinhasIndicacoes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/painel/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute staffOnly>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/auditoria"
            element={
              <ProtectedRoute staffOnly>
                <Auditoria />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/conteudos"
            element={
              <ProtectedRoute staffOnly>
                <Conteudos />
              </ProtectedRoute>
            }
          />
          {/* Endereços antigos mantidos por compatibilidade */}
          <Route path="/nomeacoes" element={<Navigate to="/nomeados" replace />} />
          <Route path="/votar" element={<Navigate to="/indicacao" replace />} />
          <Route path="/edicao-2025" element={<Navigate to={`/edicao-${site.edition}`} replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

const App = () => (
  <MotionConfig reducedMotion="user">
    <BrowserRouter>
      <AuthProvider>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground"
        >
          Saltar para o conteúdo
        </a>
        <div className="grain">
          <Navigation />
          <AnimatedRoutes />
          <Footer />
        </div>
        <CustomCursor />
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  </MotionConfig>
);

export default App;
