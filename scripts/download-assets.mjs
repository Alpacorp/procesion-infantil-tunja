// Rescata las imágenes del sitio WordPress antiguo y las guarda localmente,
// dejando el proyecto independiente del WP viejo.
// Estrategia: para cada imagen intenta el ORIGINAL (sin sufijo -1024x678) y,
// si falla, cae al tamaño que tenemos referenciado. Maneja acentos con encodeURI.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const BASE = "https://procesioninfantiltunja.com/wp-content/uploads/";
const OUT = resolve(process.cwd(), "src/assets/img");

// { path, name } — path relativo a /wp-content/uploads/. Puede traer sufijo de tamaño.
const ASSETS = [
  // Marca
  { path: "2018/05/Nuevo-Logo-Asociación.png", name: "brand/logo.png" },

  // Contenido de páginas
  { path: "2018/04/Captura-de-pantalla-2018-04-28-a-las-7.34.37-p.m..png", name: "content/fundadora.png" },
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-12.44.18-a.m.-1024x700.png", name: "content/historia.png" },
  { path: "2015/03/Captura-de-pantalla-2018-04-29-a-las-1.03.15-a.m.-1024x678.png", name: "content/recorrido.png" },
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-12.54.24-p.m.-1024x629.png", name: "content/acompanamientos-1.png" },
  { path: "2015/03/Captura-de-pantalla-2018-04-29-a-las-12.59.09-a.m.-1024x828.png", name: "content/acompanamientos-2.png" },
  { path: "2018/04/Captura-de-pantalla-2018-04-28-a-las-10.33.06-p.m.-1024x679.png", name: "content/reconocimientos.png" },

  // Galería — Recorrido Visual Histórico
  { path: "2018/04/foto-2641-758x1024.png", name: "gallery/g01.png" },
  { path: "2018/04/foto-andres.jpg", name: "gallery/g02.jpg" },
  { path: "2018/04/foto-271-1024x678.jpg", name: "gallery/g03.jpg" },
  { path: "2018/04/24630005.jpg", name: "gallery/g04.jpg" },
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-4.39.53-p.m..png", name: "gallery/g05.png" },
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-4.39.43-p.m.-1024x596.png", name: "gallery/g06.png" },
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-4.25.35-p.m.-1024x570.png", name: "gallery/g07.png" },
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-4.25.28-p.m.-1024x889.png", name: "gallery/g08.png" },
  { path: "2015/03/Captura-de-pantalla-2018-04-29-a-las-1.11.51-a.m.-1024x774.png", name: "gallery/g09.png" },
  { path: "2015/03/Captura-de-pantalla-2018-04-29-a-las-1.10.45-a.m.-1024x869.png", name: "gallery/g10.png" },

  // Galería — Programación Especial (aniversarios, exposiciones, honores)
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-4.08.44-p.m.-671x1024.png", name: "gallery/p01.png" },
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-4.10.47-p.m.-1024x676.png", name: "gallery/p02.png" },
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-4.13.11-p.m.-1024x759.png", name: "gallery/p03.png" },
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-4.16.13-p.m.-698x1024.png", name: "gallery/p04.png" },
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-4.16.30-p.m.-1024x631.png", name: "gallery/p05.png" },
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-4.16.01-p.m.-1024x686.png", name: "gallery/p06.png" },
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-4.21.53-p.m.-1024x728.png", name: "gallery/p07.png" },
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-4.21.40-p.m.-528x1024.png", name: "gallery/p08.png" },
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-4.25.21-p.m.-1024x471.png", name: "gallery/p09.png" },
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-4.25.14-p.m.-1024x611.png", name: "gallery/p10.png" },
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-4.29.16-p.m.-406x1024.png", name: "gallery/p11.png" },
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-4.32.07-p.m.-1024x733.png", name: "gallery/p12.png" },
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-4.31.51-p.m.-1024x886.png", name: "gallery/p13.png" },
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-4.31.39-p.m.-1024x670.png", name: "gallery/p14.png" },
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-4.31.30-p.m.-1024x761.png", name: "gallery/p15.png" },
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-4.31.19-p.m.-1024x741.png", name: "gallery/p16.png" },
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-4.40.20-p.m.-1024x539.png", name: "gallery/p17.png" },
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-4.40.12-p.m.-1024x738.png", name: "gallery/p18.png" },
  { path: "2018/04/Captura-de-pantalla-2018-04-29-a-las-4.40.03-p.m.-1024x530.png", name: "gallery/p19.png" },
];

const stripSize = (p) => p.replace(/-\d+x\d+(?=\.[a-z0-9]+$)/i, "");

async function tryFetch(url) {
  const res = await fetch(encodeURI(url), { redirect: "follow" });
  if (!res.ok) return null;
  return Buffer.from(await res.arrayBuffer());
}

async function download({ path, name }) {
  const original = stripSize(path);
  const candidates = original === path ? [path] : [original, path];
  for (const c of candidates) {
    try {
      const buf = await tryFetch(BASE + c);
      if (buf && buf.length > 100) {
        const dest = resolve(OUT, name);
        await mkdir(dirname(dest), { recursive: true });
        await writeFile(dest, buf);
        const tag = c === original ? "original" : "fallback";
        return { name, ok: true, bytes: buf.length, tag, src: c };
      }
    } catch (e) {
      /* try next candidate */
    }
  }
  return { name, ok: false };
}

const results = [];
for (const a of ASSETS) {
  const r = await download(a);
  results.push(r);
  console.log(
    r.ok
      ? `  ok   ${r.name.padEnd(28)} ${(r.bytes / 1024).toFixed(0).padStart(5)} KB  [${r.tag}]`
      : `  FAIL ${a.name}  <- ${a.path}`
  );
}

const okc = results.filter((r) => r.ok).length;
console.log(`\nDescargadas ${okc}/${ASSETS.length} imágenes en src/assets/img/`);
const failed = results.filter((r) => !r.ok);
if (failed.length) console.log("Fallidas:", failed.map((f) => f.name).join(", "));
