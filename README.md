# SerFP — Tu referencia para estudiar FP en España

Sitio web informativo sobre Formación Profesional en España. Información clara, honesta y sin humo.

## Stack

- **Next.js 16** + **React 19** + **TypeScript**
- **Tailwind CSS 4** con plugin de tipografía
- **MDX** para artículos del blog (`next-mdx-remote`)
- **Vercel** para despliegue y analytics

## Estructura

```
src/
├── app/
│   ├── blog/              # Listado y artículos del blog
│   ├── empleabilidad/     # Análisis de demanda laboral por sector
│   ├── testimonios/       # Experiencias reales de estudiantes
│   ├── recursos/          # Guías, checklists y comparativas
│   ├── api/newsletter/    # Endpoint para suscripción (Brevo)
│   └── page.tsx           # Landing page principal
├── components/            # Componentes UI reutilizables
└── lib/posts.ts           # Utilidades para leer contenido Markdown

content/
└── blog/                  # Artículos en formato Markdown
```

## Contenido

- **Blog**: artículos sobre FP (guías, mitos, empleabilidad)
- **Empleabilidad**: datos de demanda laboral, salarios y tiempo hasta el primer empleo por familia profesional
- **Testimonios**: experiencias reales de estudiantes de FP en España
- **Recursos**: guías prácticas, checklists y comparativas

## Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Lint
npm run lint
```

## Variables de entorno

Crea un archivo `.env.local` con:

```env
BREVO_API_KEY=tu_api_key_de_brevo
BREVO_LIST_ID=2
```

- `BREVO_API_KEY`: API key de Brevo (Settings > API Keys > SMTP)
- `BREVO_LIST_ID`: ID de la lista de suscriptores en Brevo

## Despliegue

El proyecto está configurado para desplegarse en Vercel. Cada push a `main` genera un despliegue automático.
