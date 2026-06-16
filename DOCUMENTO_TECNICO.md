# Documento Técnico — Proyecto SerFP Web

## 1. ¿Qué es SerFP?

SerFP es una **página web informativa sobre Formación Profesional en España**. Su objetivo es ofrecer información clara, honesta y sin marketing agresivo sobre ciclos formativos, salidas laborales y experiencias reales de estudiantes.

Incluye un blog, newsletter, dashboard de administración y gestión de testimonios.

---

## 2. Stack tecnológico

| Tecnología | Para qué sirve |
|---|---|
| **Next.js 16** | Framework React con App Router, SSG y Server Components |
| **React 19** | Librería de interfaces de usuario |
| **TypeScript** | JavaScript con tipos (modo strict) |
| **Tailwind CSS 4** | Framework de estilos utility-first |
| **Supabase** | Base de datos PostgreSQL para blog y testimonios |
| **Upstash Redis** | Rate limiting persistente en serverless |
| **Brevo** | Email marketing y gestión de suscriptores |
| **Vercel** | Hosting y despliegue automático |
| **GitHub** | Repositorio de código fuente |

---

## 3. Arquitectura

```
serfp-web/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Landing page
│   │   ├── blog/                       # Blog (SSG + Supabase)
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx             # Loading state
│   │   │   └── [slug]/page.tsx         # Artículo con JSON-LD
│   │   ├── testimonios/                # Página de testimonios
│   │   ├── empleabilidad/              # Datos de empleabilidad
│   │   ├── recursos/                   # Guías y herramientas
│   │   ├── aviso-legal/                # Aviso legal
│   │   ├── privacidad/                 # Política de privacidad
│   │   ├── login/                      # Login del dashboard
│   │   ├── dashboard/                  # Panel de administración
│   │   │   ├── page.tsx                # Panel principal
│   │   │   ├── blog/                   # CRUD de artículos
│   │   │   ├── testimonios/            # CRUD de testimonios
│   │   │   └── suscriptores/           # Lista de suscriptores Brevo
│   │   ├── api/
│   │   │   ├── auth/                   # Login/logout (HMAC token)
│   │   │   ├── blog/                   # CRUD blog (Supabase)
│   │   │   ├── testimonios/            # CRUD testimonios (Supabase)
│   │   │   └── newsletter/             # Suscripción (Brevo)
│   │   ├── error.tsx                   # Error 500 personalizado
│   │   ├── not-found.tsx               # Error 404 personalizado
│   │   ├── sitemap.ts                  # Sitemap dinámico
│   │   ├── robots.ts                   # Robots.txt dinámico
│   │   └── opengraph-image.tsx         # OG image dinámica
│   ├── components/
│   │   ├── Navbar.tsx                  # Navegación (aria-labels)
│   │   ├── Footer.tsx                  # Footer con enlaces legales
│   │   ├── Hero.tsx                    # Hero con <Link>
│   │   ├── Features.tsx                # Características
│   │   ├── Testimonios.tsx             # Testimonios (lee de JSON)
│   │   ├── Empleabilidad.tsx           # Datos de empleabilidad
│   │   ├── Recursos.tsx                # Recursos
│   │   ├── Newsletter.tsx              # Formulario suscripción
│   │   ├── DashboardSidebar.tsx        # Sidebar del dashboard
│   │   ├── DeletePostButton.tsx        # Botón eliminar con confirmación
│   │   └── LoadingSpinner.tsx          # Spinner de carga
│   └── lib/
│       ├── config.ts                   # URL del sitio (env var)
│       ├── supabase.ts                 # Cliente Supabase
│       ├── posts.ts                    # Blog: SSG (files) + CRUD (Supabase)
│       ├── testimonios.ts              # Testimonios: fallback + CRUD (Supabase)
│       ├── brevo.ts                    # API Brevo con caché 5min
│       ├── auth.ts                     # HMAC token (no password en cookie)
│       ├── password.ts                 # PBKDF2 hashing
│       ├── rate-limit.ts               # Upstash Redis + fallback memoria
│       ├── cache.ts                    # Caché genérico in-memory
│       └── cors.ts                     # CORS restrictivo
├── supabase/
│   └── schema.sql                      # Schema de tablas
├── scripts/
│   └── hash-password.js                # Generador de hash de contraseña
├── content/
│   ├── blog/                           # Artículos Markdown
│   └── testimonios.json                # Testimonios (fuente para SSG)
└── .env.example                        # Plantilla de variables
```

---

## 4. Sistemas implementados

### 4.1 Autenticación del dashboard

- **Método:** HMAC token firmado con la contraseña
- **Cookie:** `dashboard_auth` (httpOnly, secure, sameSite lax, 7 días)
- **La contraseña NUNCA se almacena en la cookie**
- Soporta contraseñas hasheadas (PBKDF2) y plain text (legacy)

### 4.2 Rate limiting

- **Producción:** Upstash Redis (persistente entre cold starts de Vercel)
- **Desarrollo:** Fallback a Map in-memory
- **Configuración:** 5 req/60s (newsletter), 10 req/15min (login)

### 4.3 Blog (CRUD)

- **SSG:** Lee archivos `.md` de `content/blog/` para generación estática
- **CRUD:** Supabase para crear/editar/borrar desde el dashboard
- **Frontmatter:** Escapado automático de comillas

### 4.4 Testimonios

- **Fuente única:** `content/testimonios.json`
- **CRUD:** Supabase para gestionar desde el dashboard
- **SSG:** Fallback a archivo local para generación estática

### 4.5 Newsletter (Brevo)

- Validación de email
- Manejo de duplicados (tratado como éxito)
- Caché 5 minutos en consulta de suscriptores
- Rate limiting (5 req/min)

---

## 5. Variables de entorno

| Variable | Descripción | Obligatoria |
|---|---|---|
| `BREVO_API_KEY` | API key de Brevo | Sí (newsletter) |
| `BREVO_LIST_ID` | ID lista suscriptores (default: 3) | Sí |
| `DASHBOARD_PASSWORD` | Contraseña del dashboard (plain o hash PBKDF2) | Sí |
| `NEXT_PUBLIC_SITE_URL` | URL del sitio (default: serfp-web.vercel.app) | Sí |
| `SUPABASE_URL` | URL de tu proyecto Supabase | Sí (CRUD) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service Role Key de Supabase | Sí (CRUD) |
| `UPSTASH_REDIS_REST_URL` | URL de Upstash Redis | No (fallback memoria) |
| `UPSTASH_REDIS_REST_TOKEN` | Token de Upstash Redis | No (fallback memoria) |

---

## 6. Páginas del sitio

| Página | URL | Descripción |
|---|---|---|
| Landing | / | Hero, Features, Testimonios, Empleabilidad, Recursos, Newsletter |
| Blog | /blog | Listado de artículos |
| Artículo | /blog/[slug] | Artículo individual con JSON-LD |
| Testimonios | /testimonios | Experiencias reales de estudiantes |
| Empleabilidad | /empleabilidad | Datos por familia profesional |
| Recursos | /recursos | Guías, checklists y comparativas |
| Aviso legal | /aviso-legal | Información legal |
| Privacidad | /privacidad | Política de protección de datos |
| Login | /login | Acceso al dashboard |
| Dashboard | /dashboard | Panel de administración |
| Dashboard blog | /dashboard/blog | Gestión de artículos |
| Dashboard testimonios | /dashboard/testimonios | Gestión de testimonios |
| Dashboard suscriptores | /dashboard/suscriptores | Lista de suscriptores Brevo |

---

## 7. SEO

- **Sitemap dinámico** — Generado automáticamente con `sitemap.ts`
- **Robots.txt** — Configurado con `robots.ts`
- **Open Graph** — Imagen dinámica generada con `opengraph-image.tsx`
- **JSON-LD** — Schema de Article en cada post del blog
- **Metadata** — Títulos y descripciones por página
- **Dominio configurable** — Via `NEXT_PUBLIC_SITE_URL`

---

## 8. Seguridad

| Medida | Implementación |
|---|---|
| Cookies seguras | httpOnly, secure (prod), sameSite lax |
| Password hashing | PBKDF2 con salt, 100K iteraciones |
| Rate limiting | Upstash Redis (persistente) |
| CORS | Restrictivo en endpoints públicos |
| API keys | En variables de entorno, nunca en código |
| Auth token | HMAC firmado, no almacena contraseña |
| Frontmatter safe | Escape de comillas en blog API |

---

## 9. Despliegue

```
git push → GitHub → Vercel detecta → npm install → build → deploy
```

**Tiempo:** ~30 segundos. Despliegue automático en cada push a `main`.

---

## 10. Cómo mantener

### Añadir artículo al blog
1. Ir a `/dashboard/blog/nuevo`
2. Rellenar título, slug, categoría, contenido (Markdown)
3. Guardar → se guarda en Supabase

### Gestionar testimonios
1. Ir a `/dashboard/testimonios`
2. Crear, editar o eliminar testimonios
3. Se guardan en Supabase

### Generar hash de contraseña
```bash
node scripts/hash-password.js mi-contraseña
```
Copiar el resultado como valor de `DASHBOARD_PASSWORD` en Vercel.

---

## 11. Plataformas

| Plataforma | URL | Uso |
|---|---|---|
| GitHub | github.com/alfonsopixota/serfp-web | Código fuente |
| Vercel | vercel.com/dashboard | Despliegue |
| Supabase | supabase.com/dashboard | Base de datos |
| Upstash | console.upstash.com | Redis (rate limiting) |
| Brevo | app.brevo.com | Email marketing |
| Producción | serfp-web.vercel.app | Web pública |

---

## 12. Costes

| Servicio | Plan | Coste |
|---|---|---|
| Vercel | Hobby | 0€ |
| Supabase | Free (500MB) | 0€ |
| Upstash | Free (10K comandos/día) | 0€ |
| Brevo | Free (300 emails/día) | 0€ |
| GitHub | Free | 0€ |

**Coste total: 0€**

---

*Documento actualizado el 16 de junio de 2026*
