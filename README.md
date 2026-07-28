# Procesión Infantil Tunja — sitio web

Sitio institucional de la **Asociación Procesión Infantil Tunja**, construido con
[Astro](https://astro.build) (estático) + Tailwind CSS v4. Remodelación moderna
del antiguo sitio WordPress, con contenido e imágenes rescatados y ahora
independientes.

## Comandos

| Comando                 | Acción                                             |
| ----------------------- | -------------------------------------------------- |
| `npm install`           | Instala dependencias                               |
| `npm run dev`           | Servidor de desarrollo en `localhost:4321`         |
| `npm run build`         | Compila el sitio de producción en `dist/`          |
| `npm run preview`       | Previsualiza el build de producción                |
| `npm run rescue-assets` | Vuelve a descargar imágenes del WP antiguo         |

## Estructura

```
src/
├── assets/img/       Imágenes rescatadas (brand, content, gallery)
├── components/       Header, Footer, PageHeader, Figure, GalleryGrid
├── data/site.ts      Navegación, contacto y datos institucionales (editar aquí)
├── layouts/          Layout base (SEO, JSON-LD, Open Graph)
├── pages/            Una página por ruta
└── styles/global.css Sistema de diseño (colores, tipografía, utilidades)
scripts/
├── download-assets.mjs  Rescate de imágenes del sitio antiguo
└── make-og.mjs          Genera la imagen Open Graph (public/og-image.jpg)
```

## Sistema de diseño

Derivado del emblema de la Asociación (sol dorado de retablo + monograma IHS
carmesí de la Pasión, «1960»):

- **Color** — carmesí `#6E1F2A`, oro de retablo `#B0873F`, tinta `#23181A`,
  pergamino `#F4EDDD`.
- **Tipografía** — Cormorant (display) + Hanken Grotesk (cuerpo), autohospedadas.

## SEO

Sitemap, `robots.txt`, canonical, Open Graph + Twitter Card, datos estructurados
JSON-LD (Organization, WebSite, Event), HTML semántico, `lang="es"` e imágenes
responsive en WebP con `astro:assets`. Se conservan redirecciones desde slugs
antiguos del WordPress.

## Despliegue

Salida estática lista para Vercel (o cualquier hosting estático). Dominio
objetivo: `https://procesioninfantiltunja.com`.

## Estado

Todas las secciones del sitio antiguo están migradas: páginas informativas,
**Normatividad** (50 PDFs en `public/documentos/`), **Blog** (colección de
contenido en `src/content/blog/`) y **Comunidad Hermanas Clarisas**. Mejoras
modernas aplicadas: View Transitions, `content-visibility`, `font-size-adjust`
(CLS) y `fetchpriority`, todo respetando `prefers-reduced-motion`.
