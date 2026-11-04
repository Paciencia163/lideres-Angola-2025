// Conteúdo central do site. Substitua os placeholders [A CONFIRMAR] por dados reais.
export const GALA = {
  edition: "2025",
  date: new Date("2025-12-18T19:00:00+01:00"),
  dateLabel: "18 de Dezembro de 2025",
  timeLabel: "19h00 [A CONFIRMAR]",
  venue: "Hotel Epic Sana",
  city: "Luanda, Angola",
  address: "Rua da Missão, Luanda",
  mapQuery: "Hotel Epic Sana Luanda",
};

export const slugify = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const CATEGORIES = [
  ["Liderança no Setor Público", "Gestores que elevam a qualidade do serviço ao cidadão."],
  ["Liderança Empresarial", "Empreendedores e executivos que geram valor e emprego."],
  ["Liderança na Comunicação Social", "Vozes que informam com rigor e responsabilidade."],
  ["Liderança na Educação e Formação", "Quem forma as próximas gerações de angolanos."],
  ["Liderança na Saúde e Bem-Estar", "Profissionais dedicados ao cuidado e à vida."],
  ["Liderança na Cultura e Artes", "Criadores que projetam a identidade angolana."],
  ["Liderança Jovem e Inovação", "Jovens que transformam ideias em impacto."],
  ["Liderança Feminina", "Mulheres que abrem caminhos e inspiram."],
  ["Liderança Social e Comunitária", "Agentes de mudança junto das comunidades."],
  ["Liderança em Construção e Infraestruturas", "Quem constrói o futuro físico do país."],
].map(([name, description]) => ({ name, description, slug: slugify(name) }));

// Placeholders: 3 nomeados por categoria até haver lista oficial.
export const NOMINEES = CATEGORIES.flatMap((c) =>
  [1, 2, 3].map((n) => ({
    slug: `${c.slug}-nomeado-${n}`,
    name: `Nomeado ${n} [A CONFIRMAR]`,
    company: "Empresa / Instituição",
    category: c.slug,
    categoryName: c.name,
  })),
);

export const PROGRAM = [
  ["18h00", "Chegada dos convidados e passadeira vermelha"],
  ["19h00", "Cocktail de boas-vindas"],
  ["19h45", "Abertura oficial da gala"],
  ["20h15", "Entrega de prémios — primeira parte"],
  ["21h15", "Jantar e momento cultural"],
  ["22h00", "Entrega de prémios — segunda parte"],
  ["23h00", "Encerramento e networking"],
];

export const SPONSOR_TIERS = [
  { tier: "Patrocinador Principal", count: 1 },
  { tier: "Patrocinadores Ouro", count: 3 },
  { tier: "Patrocinadores Prata", count: 4 },
  { tier: "Apoio Institucional", count: 4 },
];
