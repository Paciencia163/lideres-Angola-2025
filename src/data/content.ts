/**
 * Conteúdo editorial do site.
 * Entradas marcadas com `placeholder: true` são espaços reservados: substitua pelos dados reais.
 */

// Logótipos normalizados (mesma cor e peso visual) por scripts/generate-sponsor-logos.mjs
import luaDeira from "@/assets/sponsors/lua-deira.webp";
import jldi from "@/assets/sponsors/jldi.webp";
import kanka from "@/assets/sponsors/kanka.webp";
import grupoEj from "@/assets/sponsors/grupo-ej.webp";
import catmanuel from "@/assets/sponsors/catmanuel.webp";
import africore from "@/assets/sponsors/africore.webp";
import aceldVision from "@/assets/sponsors/aceld-vision.webp";
import yosStore from "@/assets/sponsors/yos-store.webp";
import caseirinhosDoces from "@/assets/sponsors/caseirinhos-doces.webp";
import vussDesign from "@/assets/sponsors/vuss-design.webp";
import agnelaSweet from "@/assets/sponsors/agnela-sweet.webp";
import edmundoAbel from "@/assets/sponsors/edmundo-abel.webp";
import dnaCompanyHub from "@/assets/sponsors/dna-company-hub.webp";
import inapem from "@/assets/sponsors/inapem.webp";
import platinaline from "@/assets/sponsors/platinaline.webp";
import radar from "@/assets/sponsors/radar.webp";
import canal7 from "@/assets/sponsors/canal-7.webp";
import novaTela from "@/assets/sponsors/nova-tela.webp";
import bateuBwe from "@/assets/sponsors/bateu-bwe.webp";
import topKwanza from "@/assets/sponsors/topkwanza.webp";

/* ---------------------------- Imagens ---------------------------- */

/** Gera URLs WebP optimizadas do Unsplash. Substitua por fotografias próprias quando existirem. */
export const unsplash = (id: string, width: number, quality = 70) =>
  `https://images.unsplash.com/${id}?auto=format&fm=webp&fit=crop&w=${width}&q=${quality}`;

export const unsplashSrcSet = (id: string, widths: number[] = [480, 800, 1200, 1600]) =>
  widths.map((w) => `${unsplash(id, w)} ${w}w`).join(", ");

// ⚠️ Imagem de banco de imagens (ilustrativa). Substituir por fotografia da gala.
export const heroImageId = "photo-1540575467063-178a50c2df87";

/* ---------------------------- Galeria ---------------------------- */

export interface GalleryImage {
  id: string;
  imageId: string;
  alt: string;
  caption: string;
  /** Proporção usada para compor a grelha masonry */
  ratio: "portrait" | "landscape" | "square";
}

// ⚠️ Fotografias ilustrativas (Unsplash). Substituir pelas fotografias oficiais do evento.
export const gallery: GalleryImage[] = [
  { id: "g1", imageId: "photo-1540575467063-178a50c2df87", alt: "Palco iluminado durante a cerimónia de premiação", caption: "Cerimónia de premiação", ratio: "landscape" },
  { id: "g2", imageId: "photo-1511795409834-ef04bbd61622", alt: "Salão de gala decorado com mesas e iluminação ambiente", caption: "O salão da gala", ratio: "portrait" },
  { id: "g3", imageId: "photo-1464366400600-7168b8af9bc3", alt: "Actuação artística em palco com luzes de espectáculo", caption: "Actuação artística", ratio: "square" },
  { id: "g4", imageId: "photo-1492684223066-81342ee5ff30", alt: "Convidados a celebrar sob luzes douradas", caption: "Celebração dos premiados", ratio: "portrait" },
  { id: "g5", imageId: "photo-1511578314322-379afb476865", alt: "Mesa de jantar de gala com velas e copos de cristal", caption: "Jantar de gala", ratio: "landscape" },
  { id: "g6", imageId: "photo-1505236858219-8359eb29e329", alt: "Auditório com público a assistir a uma apresentação", caption: "Momentos especiais", ratio: "landscape" },
];

/* ---------------------------- Programa ---------------------------- */

// Fonte: apresentações oficiais. Só os blocos 09:00–13:30 e 19:00–23:00 constam dos documentos.
export const programme = [
  {
    time: "09:00",
    title: "Global Investment & Leadership Forum",
    description: "Painéis com especialistas, exposição de soluções e networking profissional, no InterContinental Luanda (até às 13:30).",
  },
  {
    time: "19:00",
    title: "Gala Prémios Líderes Angola Global",
    description: "Recepção dos convidados no EPIC SANA Luanda.",
  },
  {
    time: "",
    title: "Jantar de gala e entrega de prémios",
    description: "Reconhecimento de 70 personalidades e 30 instituições, homenagens a título póstumo e distinções especiais.",
  },
  {
    time: "23:00",
    title: "Encerramento",
    description: "Convívio institucional e empresarial.",
  },
];

/* ---------------------------- Percurso ---------------------------- */

export const editionsHistory = [
  { year: "2024", place: "Luanda", detail: "Edição inaugural", text: "Início da iniciativa de reconhecimento de figuras e instituições." },
  { year: "2025", place: "Luanda", detail: "18 de Dezembro", text: "Gala no EPIC SANA e lançamento da revista física Líderes Angola." },
  { year: "2026", place: "Dubai", detail: "19 de Junho", text: "Edição internacional no Grand Cosmopolitan Hotel, com a diáspora." },
];

/* ---------------------------- Distinções 2026 ---------------------------- */

export const specialDistinctions = [
  "Grande Líder de Angola",
  "Prémio Mérito e Impacto Social",
  "Personalidade Inspiradora do Ano",
  "Prémio Reconhecimento Internacional",
  "Prémio Júri de Honra",
];

export const featuredNominees = [
  { name: "Agostinho Kapaia", category: "Líderes Empresários do Ano" },
  { name: "Dárdano Santos", category: "Líderes CEOs e PCAs do Ano" },
  { name: "Wilson Ganga", category: "Líderes Empresários do Ano" },
  { name: "João Soares da Silva Dono", category: "Líderes da Educação, Ensino e Académicos do Ano" },
];

/* ---------------------------- Júri ---------------------------- */

export const jury = {
  board: [
    { name: "Laurinda Macedo", role: "Presidente" },
    { name: "Victorina Cuanga", role: "Vice-Presidente" },
    { name: "Beatriz da Silva", role: "Secretária-Geral" },
  ],
  members: ["Francisca Savimbi", "Lídia Amões", "Natacha Massano", "Lígia Fraga", "Francisca Abel", "Bruno Arrobas"],
  criteria: "A avaliação considera mérito, ética, integridade e contributo social.",
};

/* ---------------------------- Fórum (GILF) ---------------------------- */

export const forumThemes = [
  { title: "Liderança e capital humano", text: "Talento, formação e transformação das organizações." },
  { title: "Investimento e diversificação", text: "Capital e parcerias para o desenvolvimento económico." },
  { title: "Governação e sustentabilidade", text: "Responsabilidade institucional e decisões de longo prazo." },
  { title: "África no contexto global", text: "Cooperação e posicionamento do continente." },
  { title: "Sul Global e financiamento", text: "Perspectivas de cooperação e acesso a capital." },
  { title: "Sustentabilidade e mares limpos", text: "Ambiente e responsabilidade sobre os recursos marinhos." },
];

export const forumSpeakers = [
  { name: "Adilson Paulo", role: "Director Executivo da SGS Angola" },
  { name: "Bráulio Augusto", role: "PCA do INAPEM" },
  { name: "Zacarias Samba", role: "Formação Profissional na Sociedade Mineira de Catoca" },
  { name: "Maurílio Carbonel Mateus", role: "Business Strategy e Marketing na Bosch Angola" },
  { name: "Lourenço Pinto Francisco Kwenda", role: "Académico e investigador" },
  { name: "Nazário Vilhena", role: "Deputado à Assembleia Nacional" },
];

export const forumInternationalSpeakers = [
  { name: "Donald Somanda Kongwa", role: "Standard Chartered Bank nos Emirados Árabes Unidos" },
  { name: "Bénito Lukeba", role: "Orange Money na Europa" },
  { name: "Mecktilder M.M.", role: "Recursos Naturais e Desenvolvimento" },
];

export const audienceProfiles = ["Empresas e empreendedores", "Banca e investimento", "Instituições e cooperação", "Academia e comunicação"];

/* ---------------------------- Patrocínio ---------------------------- */

// Valores de investimento omitidos de propósito: constam da proposta de patrocínio enviada pela organização.
export const sponsorshipTiers = [
  { name: "Bronze", positioning: "Presença institucional", invites: "4 convites fórum · 2 convites gala", highlights: "Roll-up, logótipo no painel colectivo e no website, 2 publicações digitais." },
  { name: "Prata", positioning: "Exposição ampliada", invites: "8 convites fórum · 4 convites gala", highlights: "Stand padrão, perfil de uma página, vídeo até 30 s e 1 menção protocolar." },
  { name: "Ouro", positioning: "Activação e conteúdo", invites: "12 convites fórum · 8 convites gala", highlights: "Stand preferencial, entrevista gravada, peça editorial e vídeo até 45 s." },
  { name: "Platina", positioning: "Parceiro principal", invites: "20 convites fórum · 10 convites gala", highlights: "Stand premium, entrevista audiovisual, 2 peças editoriais e vídeo até 60 s." },
  { name: "Diamante", positioning: "Proposta personalizada", invites: "Convites à medida", highlights: "Naming de área, exclusividade por sector e programa de relacionamento B2B." },
];

/* ---------------------------- Vencedores ---------------------------- */

export interface Winner {
  id: string;
  name: string;
  category: string;
  year: number;
  photo?: string;
  placeholder?: boolean;
}

// ⚠️ PLACEHOLDERS — os vencedores da edição 2025 não constam do site original.
// Substitua por nome, categoria e fotografia reais e remova `placeholder: true`.
export const winners: Winner[] = Array.from({ length: 8 }, (_, i) => ({
  id: `w2025-${i + 1}`,
  name: "Nome do Vencedor",
  category: "Categoria a indicar",
  year: 2025,
  placeholder: true,
}));

export interface HallOfFameEntry {
  id: string;
  name: string;
  distinction: string;
  year: number;
  placeholder?: boolean;
}

// ⚠️ PLACEHOLDERS — Hall da Fama (homenagens de carreira / prémios especiais).
export const hallOfFame: HallOfFameEntry[] = Array.from({ length: 3 }, (_, i) => ({
  id: `hof-${i + 1}`,
  name: "Nome do Homenageado",
  distinction: "Prémio Carreira",
  year: 2025,
  placeholder: true,
}));

/* ---------------------------- Patrocinadores ---------------------------- */

export type SponsorTier = "realizacao" | "patrocinador" | "parceiros" | "institucional" | "midia";

export interface Sponsor {
  id: string;
  name: string;
  tier: SponsorTier;
  /** Caminho para o logótipo a cores (SVG ou PNG transparente). Vazio = placeholder. */
  logo?: string;
  url?: string;
  placeholder?: boolean;
}

export const sponsorTiers: { tier: SponsorTier; label: string }[] = [
  { tier: "realizacao", label: "Realização" },
  { tier: "patrocinador", label: "Patrocinadores" },
  { tier: "parceiros", label: "Parceiros" },
  { tier: "institucional", label: "Apoio Institucional" },
  { tier: "midia", label: "Apoio de Média" },
];

export const sponsors: Sponsor[] = [
  { id: "lua-deira", name: "Lua-Deira Digital Angola", tier: "realizacao", logo: luaDeira },
  { id: "jldi", name: "JLDI – Consultoria e Prestação de Serviços", tier: "realizacao", logo: jldi },

  { id: "kanka", name: "Kanka Soluções", tier: "patrocinador", logo: kanka },
  { id: "grupo-ej", name: "Grupo EJ", tier: "patrocinador", logo: grupoEj },
  { id: "catmanuel", name: "Catmanuel & Filhos, Lda", tier: "patrocinador", logo: catmanuel },

  { id: "africore", name: "AfriCore Studios Dubai", tier: "parceiros", logo: africore },
  { id: "aceld-vision", name: "Aceld Vision", tier: "parceiros", logo: aceldVision },
  { id: "yos-store", name: "Yo's Store", tier: "parceiros", logo: yosStore },
  { id: "caseirinhos-doces", name: "Caseirinhos Doces Confeitaria", tier: "parceiros", logo: caseirinhosDoces },
  { id: "vuss-design", name: "Vuss Design", tier: "parceiros", logo: vussDesign },
  { id: "agnela-sweet", name: "Agnela Sweet", tier: "parceiros", logo: agnelaSweet },
  { id: "edmundo-abel", name: "Edmundo Abel", tier: "parceiros", logo: edmundoAbel },
  { id: "dna-company-hub", name: "DNA Company Hub", tier: "parceiros", logo: dnaCompanyHub },

  { id: "inapem", name: "INAPEM", tier: "institucional", logo: inapem },

  { id: "platinaline", name: "PlatinaLine", tier: "midia", logo: platinaline },
  { id: "radar", name: "Radar", tier: "midia", logo: radar },
  { id: "canal-7", name: "Canal 7", tier: "midia", logo: canal7 },
  { id: "nova-tela", name: "Nova Tela .AO", tier: "midia", logo: novaTela },
  { id: "bateu-bwe", name: "Bateu Bwé", tier: "midia", logo: bateuBwe },
  { id: "topkwanza", name: "TopKwanza", tier: "midia", logo: topKwanza },
];

/* ---------------------------- Testemunhos ---------------------------- */

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  placeholder?: boolean;
}

// ⚠️ PLACEHOLDERS — substituir por citações reais e autorizadas de premiados e parceiros.
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "Espaço reservado para o testemunho de um premiado da edição 2025 sobre o significado do reconhecimento.",
    author: "Nome do Premiado",
    role: "Categoria · Edição 2025",
    placeholder: true,
  },
  {
    id: "t2",
    quote: "Espaço reservado para a citação de um parceiro institucional sobre o impacto dos Prémios Líderes Angola.",
    author: "Nome do Parceiro",
    role: "Cargo · Instituição",
    placeholder: true,
  },
  {
    id: "t3",
    quote: "Espaço reservado para um destaque de imprensa sobre a gala e os seus homenageados.",
    author: "Órgão de Comunicação",
    role: "Imprensa",
    placeholder: true,
  },
];

/* ---------------------------- Perguntas frequentes ---------------------------- */

export const faqs = [
  {
    question: "Como posso indicar alguém para nomeação?",
    answer: "Preencha o formulário na página Indicação: escolha a categoria, identifique a personalidade ou instituição e explique o motivo. Cada indicação é avaliada pelo júri.",
  },
  {
    question: "Quando recebo a confirmação do meu bilhete?",
    answer: "A confirmação é enviada até 24 horas após a verificação do pagamento, por e-mail ou WhatsApp.",
  },
  {
    question: "Quando e onde decorre a gala?",
    answer: "A 17 de Dezembro de 2026, das 19:00 às 23:00, no EPIC SANA Luanda. Na manhã do mesmo dia, das 09:00 às 13:30, decorre o Global Investment & Leadership Forum, no InterContinental Luanda.",
  },
  {
    question: "Há estacionamento no local?",
    answer: "Sim, o hotel dispõe de estacionamento para os convidados do evento.",
  },
  {
    question: "Qual é o código de vestuário?",
    answer: "Traje de gala. Pedimos trajes formais e elegantes, à altura da noite.",
  },
];
