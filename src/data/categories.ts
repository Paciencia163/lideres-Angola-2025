import {
  Award,
  Briefcase,
  Building,
  GraduationCap,
  HandHeart,
  HeartPulse,
  Lightbulb,
  Newspaper,
  Palette,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface Category {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const categories: Category[] = [
  {
    slug: "setor-publico",
    title: "Liderança no Sector Público",
    description: "Excelência na administração e no serviço público.",
    icon: Building,
  },
  {
    slug: "empresarial",
    title: "Liderança Empresarial",
    description: "Empresários que impulsionam a economia nacional.",
    icon: Briefcase,
  },
  {
    slug: "comunicacao-social",
    title: "Liderança na Comunicação Social",
    description: "Profissionais que informam e educam a sociedade.",
    icon: Newspaper,
  },
  {
    slug: "educacao",
    title: "Liderança na Educação e Formação",
    description: "Educadores que transformam vidas através do conhecimento.",
    icon: GraduationCap,
  },
  {
    slug: "saude",
    title: "Liderança na Saúde e Bem-Estar",
    description: "Profissionais dedicados ao cuidado da população.",
    icon: HeartPulse,
  },
  {
    slug: "cultura-artes",
    title: "Liderança na Cultura e Artes",
    description: "Artistas que enriquecem o património cultural angolano.",
    icon: Palette,
  },
  {
    slug: "jovem-inovacao",
    title: "Liderança Jovem e Inovação",
    description: "Jovens que lideram com criatividade e inovação.",
    icon: Lightbulb,
  },
  {
    slug: "feminina",
    title: "Liderança Feminina",
    description: "Mulheres que quebram barreiras e inspiram gerações.",
    icon: Sparkles,
  },
  {
    slug: "social-comunitaria",
    title: "Liderança Social e Comunitária",
    description: "Líderes que transformam comunidades e causas sociais.",
    icon: HandHeart,
  },
  {
    slug: "construcao-infraestruturas",
    title: "Liderança em Construção e Infraestruturas",
    description: "Profissionais que constroem o futuro de Angola.",
    icon: Award,
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
