# Instrucciones de desarrollo — SerFP

## Comandos

- `npm run dev` — servidor de desarrollo en localhost:3000
- `npm run build` — build de producción
- `npm run lint` — linting con ESLint

## Convenciones

- Componentes en `src/components/` — uno por archivo, PascalCase
- Páginas en `src/app/` usando App Router de Next.js
- Contenido del blog en `content/blog/` como Markdown con frontmatter
- Estilos con Tailwind CSS utility classes
- Tipado estricto con TypeScript (no usar `any`)

## Frontmatter del blog

```yaml
---
titulo: "Título del artículo"
descripcion: "Descripción corta para SEO"
fecha: "YYYY-MM-DD"
categoria: "Guías" | "Empleabilidad" | "Mitos vs realidad" | "Testimonios" | "Noticias"
---
```

## API Newsletter

- Endpoint: `POST /api/newsletter`
- Body: `{ "email": "user@example.com" }`
- Usa la API v3 de Brevo para agregar contactos
- Requiere `BREVO_API_KEY` y `BREVO_LIST_ID` en `.env.local`
- Maneja contactos duplicados como éxito

## Notas importantes

- Next.js 16 tiene breaking changes — revisar `node_modules/next/dist/docs/` antes de hacer cambios grandes
- El proyecto usa `@vercel/analytics` para tracking
- El dominio de producción es `serfp.es` (configurar en metadata y sitemap)
