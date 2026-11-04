/**
 * Configuração central do site.
 * Actualize aqui a data, o local e os contactos — tudo o resto do site lê destes valores.
 *
 * Fonte: apresentações oficiais da organização (src/components/Logotipos/info):
 *   "Gala Prémios Líderes Angola — Apresentação curta" e "Proposta de patrocínio GILF 2026".
 * A organização indica que horários, locais e lotações estão sujeitos à confirmação operacional final.
 * Ao alterar a data ou o local, actualize também o bloco JSON-LD em /index.html.
 */
export const site = {
  name: "Prémios Líderes Angola Global",
  edition: 2026,
  firstEdition: 2024,
  tagline: "Reconhecemos hoje, inspiramos o amanhã",
  theme: "Liderar é Servir Angola",
  /** Entidade promotora dos prémios */
  organizer: "Luadeira Digital Angola",
  /** Co-organizadora da edição de Dezembro de 2026 */
  coOrganizer: "JLDI",
  founder: { name: "David Moma", role: "Fundador e Coordenador-Geral" },
  url: "https://premioslideresangola.ao", // ⚠️ substituir pelo domínio real

  event: {
    confirmed: true,
    // Hora de Luanda (WAT, UTC+1)
    startsAt: "2026-12-17T19:00:00+01:00",
    endsAt: "2026-12-17T23:00:00+01:00",
    doorsOpen: "19:00",
    venue: "EPIC SANA Luanda",
    city: "Luanda",
    address: "Rua da Missão, Ingombota, Luanda, Angola",
    mapQuery: "EPIC SANA Luanda Hotel",
    dressCode: "Traje de gala",
    /** Capacidade de referência (planeamento), não presenças confirmadas */
    capacity: 350,
  },

  /** Global Investment & Leadership Forum — decorre na manhã do dia da gala */
  forum: {
    name: "Global Investment & Leadership Forum",
    short: "GILF",
    startsAt: "2026-12-17T09:00:00+01:00",
    endsAt: "2026-12-17T13:30:00+01:00",
    time: "09:00 – 13:30",
    venue: "InterContinental Luanda",
    capacity: 450,
  },

  /** Números da edição de 2026 */
  awards: {
    figures: 70,
    figureCategories: 22,
    institutions: 30,
    institutionCategories: 10,
    posthumous: 6,
    specialDistinctions: 5,
  },

  tickets: {
    priceKz: 125000,
    freeInvitesPerNominee: 1,
    paymentLink: "https://www.paylink.com/premioslideresangola",
    bank: {
      name: "BCI",
      holder: "Dado Dja Focos",
      iban: "AO06 0005 0000 0719 4507 1011 5",
    },
  },

  contact: {
    phone: "+244 922 812 224",
    phoneHref: "tel:+244922812224",
    phone2: "+244 945 408 863",
    phone2Href: "tel:+244945408863",
    whatsapp: "https://wa.me/244922812224",
    email: "angolajobssummit@gmail.com",
    hours: [
      { days: "Segunda a Sexta", time: "09:00 – 18:00" },
      { days: "Sábado", time: "09:00 – 13:00" },
      { days: "Domingo e feriados", time: "Encerrado" },
    ],
  },

  // ⚠️ Substituir "#" pelos endereços oficiais das redes sociais
  social: {
    instagram: "#",
    facebook: "#",
    linkedin: "#",
    youtube: "#",
  },

  // ⚠️ Prazo das indicações provisório — confirmar com a organização
  nominations: {
    open: true,
    closesAt: "2026-11-30T23:59:00+01:00",
  },
} as const;

export const formatKz = (value: number) =>
  `${new Intl.NumberFormat("pt-AO", { maximumFractionDigits: 0 }).format(value).replace(/\s/g, ".")} Kz`;

const eventDate = new Date(site.event.startsAt);

export const eventDateLong = new Intl.DateTimeFormat("pt-AO", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Africa/Luanda",
}).format(eventDate);

export const eventWeekday = new Intl.DateTimeFormat("pt-AO", {
  weekday: "long",
  timeZone: "Africa/Luanda",
}).format(eventDate);

export const eventDay = new Intl.DateTimeFormat("pt-AO", { day: "2-digit", timeZone: "Africa/Luanda" }).format(eventDate);

export const eventMonth = new Intl.DateTimeFormat("pt-AO", { month: "long", timeZone: "Africa/Luanda" }).format(eventDate);

export const eventTime = new Intl.DateTimeFormat("pt-AO", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Africa/Luanda",
}).format(eventDate);
