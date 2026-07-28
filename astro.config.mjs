// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://procesioninfantiltunja.com",
  // Preserva enlaces entrantes del sitio WordPress anterior
  redirects: {
    "/recorrido-visual-historico": "/galeria",
    "/nuestra-procesion": "/nuestra-historia",
    // Subpáginas antiguas de la Comunidad Clarisa -> página consolidada
    "/fundadora-de-la-comunidad": "/comunidad-hermanas-clarisas",
    "/historia-del-monasterio-en-tunja": "/comunidad-hermanas-clarisas",
    "/efemerides-de-la-comunidad": "/comunidad-hermanas-clarisas",
    "/gracias-senor-por-haberlo-creado": "/comunidad-hermanas-clarisas",
  },
  integrations: [sitemap()],
  // Fuentes autohospedadas con preload y fallback de métricas ajustadas
  // (elimina el parpadeo/FOUT y el salto de layout al cargar la fuente).
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Cormorant",
        cssVariable: "--font-cormorant",
        weights: ["400 700"],
        styles: ["normal", "italic"],
        fallbacks: ["Georgia", "serif"],
      },
      {
        provider: fontProviders.google(),
        name: "Hanken Grotesk",
        cssVariable: "--font-hanken",
        weights: ["300 700"],
        styles: ["normal"],
        fallbacks: ["system-ui", "sans-serif"],
      },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
    css: {
      modules: {
        // Permite usar styles.miClase en vez de styles["mi-clase"]
        localsConvention: "camelCaseOnly",
      },
    },
  },
});
