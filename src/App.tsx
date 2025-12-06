import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import Categorias from "./pages/Categorias";
import Nomeacoes from "./pages/Nomeacoes";
import Ingressos from "./pages/Ingressos";
import Edicao2025 from "./pages/Edicao2025";
import Contactos from "./pages/Contactos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/nomeacoes" element={<Nomeacoes />} />
          <Route path="/ingressos" element={<Ingressos />} />
          <Route path="/edicao-2025" element={<Edicao2025 />} />
          <Route path="/contactos" element={<Contactos />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
