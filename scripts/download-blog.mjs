// Rescata imágenes del blog / Comunidad Clarisa y PDFs de programación.
import { mkdir, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";

const B = "https://procesioninfantiltunja.com/wp-content/uploads/";
const stripSize = (p) => p.replace(/-\d+x\d+(?=\.[a-z0-9]+$)/i, "");

// [pathConSufijoOoriginal, destinoRelativo]
const ASSETS = [
  // Portadas del blog -> public/blog
  ["2026/01/san-francisco.jpeg", "public/blog/san-francisco.jpeg"],
  ["2026/01/clarisas.png", "public/blog/clarisas.png"],
  ["2025/08/fallecimiento-576x1024.jpeg", "public/blog/fallecimiento.jpeg"],
  ["2025/08/eucaristia-576x1024.jpeg", "public/blog/eucaristia.jpeg"],
  ["2024/08/Celebracion-de-la-Solemnidad-de-Nuestra-Madre-Santa.jpeg", "public/blog/celebracion-solemnidad.jpeg"],
  ["2023/08/Solemnidad-Madre-Santa-Clara.jpeg", "public/blog/solemnidad-2023.jpeg"],
  ["2023/03/procesion.png", "public/blog/procesion-2023.png"],
  ["2023/03/procesion-infantil-tunja.jpeg", "public/blog/procesion-63-anos.jpeg"],
  ["2023/03/clausura-del-ano-jubilar.jpeg", "public/blog/clausura-jubilar.jpeg"],

  // Comunidad Clarisa -> src/assets/img/clarisas (se optimizan con astro:assets)
  ["2022/08/fundadora.jpeg", "src/assets/img/clarisas/santa-clara.jpeg"],
  ["2022/08/historia-5.jpeg", "src/assets/img/clarisas/monasterio-1.jpeg"],
  ["2022/08/historia-4.jpeg", "src/assets/img/clarisas/monasterio-2.jpeg"],
  ["2022/08/historia-3.jpeg", "src/assets/img/clarisas/monasterio-3.jpeg"],
  ["2025/04/papa-francisco.webp", "src/assets/img/clarisas/papa-francisco.webp"],

  // PDFs de programación -> public/documentos/programacion
  ["2024/05/Prg_ProcesionInfantil-2024.pdf", "public/documentos/programacion/programacion-2024.pdf"],
  ["2023/03/Prg_ProcesionInfantil.pdf", "public/documentos/programacion/programacion-2023.pdf"],
];

let ok = 0;
for (const [path, dest] of ASSETS) {
  const original = stripSize(path);
  const candidates = original === path ? [path] : [original, path];
  let done = false;
  for (const c of candidates) {
    try {
      const res = await fetch(encodeURI(B + c), { redirect: "follow" });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 100) continue;
      const abs = resolve(dest);
      await mkdir(dirname(abs), { recursive: true });
      await writeFile(abs, buf);
      console.log("ok  ", dest, (buf.length / 1024).toFixed(0) + " KB", c === original ? "" : "(fallback)");
      ok++;
      done = true;
      break;
    } catch (e) {
      /* siguiente */
    }
  }
  if (!done) console.log("FAIL", dest, "<-", path);
}
console.log(`\n${ok}/${ASSETS.length} assets descargados.`);
