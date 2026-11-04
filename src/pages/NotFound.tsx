import { Link } from "react-router-dom";
import PageTransition from "@/components/layout/PageTransition";
import Logo from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { useSeo } from "@/hooks/use-seo";

const NotFound = () => {
  useSeo("Página não encontrada");
  return (
    <PageTransition>
      <section className="flex min-h-[100svh] flex-col items-center justify-center px-5 pt-nav text-center">
        <Logo className="h-16 sm:h-20" />
        <p className="eyebrow mt-10">Erro 404</p>
        <h1 className="mt-4 text-display-lg text-foreground">Página não encontrada</h1>
        <p className="mt-4 max-w-md text-muted-foreground">A página que procura não existe ou foi movida.</p>
        <Button asChild variant="gold" size="lg" className="mt-10">
          <Link to="/">Voltar ao início</Link>
        </Button>
      </section>
    </PageTransition>
  );
};

export default NotFound;
