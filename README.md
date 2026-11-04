# Prémios Líderes Angola 2026

Site oficial da gala Prémios Líderes Angola — React, Vite, Tailwind CSS, shadcn/ui e Framer Motion.

## Começar

```sh
npm install
npm run dev        # http://localhost:8080
npm run build      # versão de produção em /dist
```

## Onde editar o conteúdo

| O quê | Ficheiro |
| --- | --- |
| Data, hora, local, contactos, preço dos bilhetes, redes sociais, prazo das indicações | `src/config/site.ts` |
| Categorias | `src/data/categories.ts` |
| Nomeados 2026 e arquivo 2025 | `src/data/nominees.ts` |
| Galeria, programa, vencedores, Hall da Fama, patrocinadores, testemunhos, FAQ | `src/data/content.ts` |
| Cores, tipografia e espaçamentos (design tokens) | `src/index.css` e `tailwind.config.ts` |
| SEO global e dados estruturados (schema.org Event) | `index.html` |

Todos os dados provisórios estão marcados com `⚠️` e `placeholder: true`. Procure por `⚠️` para encontrar tudo o que falta substituir.

## Indicações e formulários

A página `/indicacao` recolhe indicações de personalidades e instituições por categoria.
Sem configuração, os formulários (indicação, contacto e newsletter) abrem o e-mail do visitante já preenchido para `angolajobssummit@gmail.com`.
Para receber os envios directamente num serviço próprio, defina num ficheiro `.env`:

```sh
VITE_FORMS_ENDPOINT=https://...  # POST { kind: "indicacao" | "contacto" | "newsletter", ... }
```

## Imagens de marca

`npm run generate:assets` gera de novo `public/og-image.png` (1200×630), o favicon e os ícones a partir de `scripts/generate-brand-assets.mjs`.
