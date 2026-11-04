import { categories } from "./categories";

export interface Nominee {
  id: string;
  name: string;
  organization: string;
  categorySlug: string;
  /** Caminho para a fotografia (ex.: "/images/nomeados/joana-silva.webp"). Vazio = silhueta. */
  photo?: string;
  /** true enquanto o nomeado real não for anunciado */
  placeholder?: boolean;
}

/**
 * ⚠️ NOMEADOS 2026 — PLACEHOLDERS
 * Os nomeados da edição 2026 ainda não foram anunciados.
 * Substitua cada entrada pelo nome, organização e fotografia reais e remova `placeholder: true`.
 * Mantenha `id` único.
 */
const PLACEHOLDERS_PER_CATEGORY = 3;

export const nominees2026: Nominee[] = categories.flatMap((category) =>
  Array.from({ length: PLACEHOLDERS_PER_CATEGORY }, (_, i) => ({
    id: `${category.slug}-${i + 1}`,
    name: `Nomeado ${String(i + 1).padStart(2, "0")}`,
    organization: "Organização a anunciar",
    categorySlug: category.slug,
    placeholder: true,
  })),
);

export const nomineesByCategory = (slug: string) => nominees2026.filter((n) => n.categorySlug === slug);

/* ------------------------------------------------------------------ */
/* Arquivo — Nomeados da edição de 2025 (Luanda). Dados reais. */
/* ------------------------------------------------------------------ */

export interface ArchiveCategory {
  categoria: string;
  nomeados: string[];
}

export const archive2025Figuras: ArchiveCategory[] = [
  { categoria: "Líder em Defesa dos Direitos Humanos", nomeados: ["Victorina Cuanga", "Esperança Sita Garreth"] },
  { categoria: "Líder em Ensino e Conhecimento", nomeados: ["Venceslau Andrade", "Evandra Martins", "Carlos Feijó", "Matias Caxixi", "Ana Pita Gros Martins da Silva", "Amilcar Mário António", "Otávio Muanza"] },
  { categoria: "Líder em Ciências e Inovação", nomeados: ["Marco Paulo e Marco Romero"] },
  { categoria: "Líder em Saúde e Bem-estar", nomeados: ["Sweni Coelho", "Silva Lutucuta", "Jovita André"] },
  { categoria: "Líder em Gestão Pública", nomeados: ["Vera Daves", "Márcio de Jesus Lopes Daniel", "Cristina Lourenço"] },
  { categoria: "Líder em Produção de Conteúdo Digital", nomeados: ["Silirasday"] },
  { categoria: "Líder em Criação de Conteúdo sobre Finança e Economia", nomeados: ["Nuno Baio", "Euclides Francisco"] },
  { categoria: "Líder Empresarial Sector Privado", nomeados: ["Sarchel Nécesio", "Wilson Ganga", "Adilson Nelumba", "Bento Kangamba", "António Duarte", "Edmasio Casimiro", "Rosário André Pedro Kivota", "Eliseu Quituxi", "Julio Varela", "Lucas Cassanguidi"] },
  { categoria: "Líder Mulher do Ano", nomeados: ["Berta Rodrigue Issa", "Ludmila Cangundo", "Marleyh Selo", "Laurinda Macedo", "Juliana Fontes Pereira", "Neusa Semedo Colsoul", "Lisandra Francisco", "Beatriz A. N. Silva", "Karina Barbosa", "Mara Quiosa"] },
  { categoria: "Líder em Comunicação na Diáspora", nomeados: ["Pedro Muenho", "Hariana Vera"] },
  { categoria: "Líder Jovem do Ano", nomeados: ["Nair Nany", "Jessi Madalena"] },
  { categoria: "Líder em Literatura e Impacto Social", nomeados: ["Nituecheni Africano"] },
  { categoria: "Líder Juvenil de Impacto Social", nomeados: ["Mateus Esteita"] },
  { categoria: "Líder em Comunicação, Marketing e Assessoria de Imprensa", nomeados: ["Mariano da Fonseca", "Monaliza Queiroz"] },
  { categoria: "Líder em Comunicação Social e Televisão", nomeados: ["Benvindo Magalhães", "Dina Simão"] },
  { categoria: "Líder em Comunicação e Televisão", nomeados: ["Geovany Comandala"] },
  { categoria: "Líder em Finanças e Economia", nomeados: ["Geraldo Dala"] },
  { categoria: "Líder em Impacto Social na Diáspora Angolana", nomeados: ["Gabriel Cambinda"] },
  { categoria: "Líder em Literatura e Arte na Diáspora Angolana", nomeados: ["Cutana Carvalho"] },
  { categoria: "Líder Regional Norte", nomeados: ["Francisco Amado John"] },
  { categoria: "Líder em Responsabilidade Social, Cultural e Criatividade", nomeados: ["Conde dos Bolos"] },
  { categoria: "Líder em Impacto Social Notável", nomeados: ["Fly Skuad"] },
  { categoria: "Líder em Política e Gestão Pública", nomeados: ["Danila Bragança"] },
  { categoria: "Líder em Responsabilidade Social, Arte e Cultural", nomeados: ["C4 Pedro", "Yola Araújo"] },
  { categoria: "Líder em Impacto e Responsabilidade Social e Corporativa", nomeados: ["Cumbi Jr", "Patrícia Gonçalves", "Link Duílio"] },
  { categoria: "Líder em Responsabilidade Social e Cultural", nomeados: ["Vina Criolo", "Soraya da Piedade"] },
  { categoria: "Líder em Responsabilidade Social, Moda e Cultural", nomeados: ["Sara Mosquito", "Hadjalmar El Vaim", "Nadir Taty"] },
  { categoria: "Líder em Gestão Empresarial no Sector Privado", nomeados: ["Benedito P. Manuel", "Aparna Krovi", "Leonel Correia", "Maria Uini Baptista", "Adilson Paulo", "Euridce Nascimento", "Pedro Godinho"] },
  { categoria: "Líder em Responsabilidade Social, Cultural e Turismo", nomeados: ["Leila Lopes"] },
  { categoria: "Líder em Empreendedorismo Local", nomeados: ["Guilherme Afonso"] },
  { categoria: "Líder em Política Pública", nomeados: ["Aia Eza da Silva"] },
  { categoria: "Líder em Diplomacia Política", nomeados: ["Stella Santiago", "Dalva Ringote"] },
  { categoria: "Líder em Negócios, Cultural e Turismo", nomeados: ["Leon Lemos"] },
];

export const archive2025Instituicoes: ArchiveCategory[] = [
  { categoria: "Líder em Hotelaria e Lazer", nomeados: ["Hotel Sivam", "Hotel EPIC Sana"] },
  { categoria: "Líder em Responsabilidade Social e Desenvolvimento Pessoal", nomeados: ["Instituto Innante"] },
  { categoria: "Líder em Comunicação, Podcast de Debates", nomeados: ["Goza Aqui", "Pensar Angola"] },
  { categoria: "Líder em Ensino e Desenvolvimento Humano", nomeados: ["Universidade Gregório Semedo", "Universidade Unibela", "Universidade Muandume Ya Ndemufayo", "Bolsas de estudos Emanuel Xirimbimbi"] },
  { categoria: "Líder em Governação", nomeados: ["Governo Provincial do Huambo", "Governo Provincial do Namibe"] },
  { categoria: "Líder em Responsabilidade Social e Desenvolvimento Humano", nomeados: ["FIJE"] },
  { categoria: "Líder em Comunicação e Apoio Social", nomeados: ["Fly Podcast"] },
  { categoria: "Líder em Restauração e Lazer", nomeados: ["Detalhe de Luxo"] },
  { categoria: "Líder na Indústria e Produção Nacional", nomeados: ["Novaagrolider", "Catoca", "Yetwene"] },
  { categoria: "Líder em Finanças e Banca", nomeados: ["Banco BAI", "Paypay"] },
  { categoria: "Líder no Sector Público", nomeados: ["CCIAM"] },
  { categoria: "Líder em Responsabilidade Social Corporativa", nomeados: ["Angola Business byn Border"] },
  { categoria: "Líder no Sector Automobilístico", nomeados: ["Jetour"] },
  { categoria: "Líder em Mobilidade Urbana", nomeados: ["Ugo", "EV GRUPO"] },
  { categoria: "Líder em Saúde Pública", nomeados: ["Hospital Materno Infantil", "Ordem dos Médicos"] },
  { categoria: "Líder em Televisão", nomeados: ["TV Zimbo"] },
  { categoria: "Líder em Rádio e Comunicação no Digital", nomeados: ["Platina Fm"] },
  { categoria: "Líder em Responsabilidade Social", nomeados: ["Associação dos Vitiligos", "Associação MKV", "Miss Angola Universo"] },
  { categoria: "Líder em Infraestrutura e Fiscalização e Construção Civil", nomeados: ["Group Copia", "Tegma SU"] },
  { categoria: "Líder em Inovação e Tecnologia, Telecomunicações e Comunicação", nomeados: ["Portal de TI", "Ouranós Record"] },
  { categoria: "Líder em Restauração e Turismo na Diáspora Angolana", nomeados: ["Pura Experiência"] },
  { categoria: "Líder em Informação Jornal Digital", nomeados: ["Club K"] },
  { categoria: "Líder em Asseguramento e Protecção", nomeados: ["Socorro"] },
];

const count = (list: ArchiveCategory[]) => list.reduce((acc, c) => acc + c.nomeados.length, 0);

export const archive2025Stats = {
  nominees: count(archive2025Figuras) + count(archive2025Instituicoes),
  categories: archive2025Figuras.length + archive2025Instituicoes.length,
};
