// Rescata los PDFs de Normatividad del WP antiguo y genera un manifiesto.
import { mkdir, writeFile } from "node:fs/promises";
import { resolve, dirname, basename } from "node:path";

const OUT = resolve("public/documentos");
const MANIFEST = resolve("src/data/normatividad.json");

const URLS = [
  // 2025
  "https://procesioninfantiltunja.com/wp-content/uploads/2025/08/1-Acta-Junta-directiva.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2025/08/2-Certificacion-Informe-de-Tesoreria.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2025/08/3-Certificacion-Presupuesto-2024.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2025/08/4-Certificacion-Actualizacion-Datos.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2025/08/5-Certificacion-Antecedentes.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2025/08/6-Certificacion-Asignaciones-Permanentes.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2025/08/7-Certificacion-Beneficio-Neto-o-Excedente.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2025/08/8-Certificacion-Cargos-Gerenciales-o-Directivos.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2025/08/9-Certificacion-Contratos.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2025/08/10-Certificacion-de-Salarios.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2025/08/11-Certificacion-Donacion.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2025/08/12-Certificacion-Verificacion-de-Requisitos.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2025/08/13-Informe-de-Gestion-y-Resultados-2024.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2025/08/CAMARA-DE-COMERCIO.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2025/08/DICTAMEN-REVISOR-FISCAL.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2025/08/ESTADOS-FINANCIEROS-2024.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2025/08/Estatutos-Asociacion-Procesion-Infantil.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2025/08/RUES.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2025/08/RUT.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2025/08/SOLICITUD-PERMANCENCIA-ESAL.pdf",
  // 2024
  "https://procesioninfantiltunja.com/wp-content/uploads/2024/08/Acta-Asamblea-Gral-Procesioon-2-marzo-2024.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2024/08/Acta-de-Constitucion.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2024/08/Acta-Junta-Directiva-2024.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2024/08/Certificacion-Actualizacion-Datos.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2024/08/Certificacion-antecedentes.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2024/08/Certificacion-Asignaciones-Permanentes.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2024/08/Certificacion-Beneficio-Neto-o-Excedente.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2024/08/Certificacion-Cargos-Gerenciales-o-Directivos.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2024/08/Certificacion-Donacion.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2024/08/Certificacion-Informe-de-Tesoreria.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2024/08/Certificacion-Presupuesto-2024.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2024/08/Certificacion-Verificacion-de-Requisitos.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2024/08/Certificado-existencia-CCT.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2024/08/Estados-financieros-2023-Asociacion-Proc.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2024/08/Estatutos-Asociacion-Procesion-Infantil.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2024/08/Informe-de-Gestion-y-Resultados-2023.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2024/08/Informe-revisor-fiscal-2023.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2024/08/RUES.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2024/08/RUT.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2024/08/Solicitud-de-permanencia-RTE-2024.pdf",
  // 2023
  "https://procesioninfantiltunja.com/wp-content/uploads/2023/07/Acta-de-Constitucion.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2023/07/Acta-de-Reunion-Junta-Directiva-2023.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2023/07/Cert.-de-Existencia-y-Rep.-Legal.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2023/07/Certificacion-Cargos-Directivos-y-Salarios.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2023/07/Certificado-Antecedentes-Judiciales.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2023/07/Estados-Financieros-2023.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2023/07/Estatutos-Asociacion-Procesion-Infantil.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2023/07/Informe-de-Gestion-y-Resultados-2022.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2023/07/RUT-Asoc-Jueves-Santo.pdf",
  "https://procesioninfantiltunja.com/wp-content/uploads/2023/07/Solicitud-Permanencia-RTE-2023.pdf",
];

const prettify = (file) => {
  let s = basename(file, ".pdf");
  s = s.replace(/^\d+-/, ""); // quita prefijo numérico
  s = s.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  s = s.replace(/\bProc\b/g, "Procesión");
  // Mayúscula inicial conservando acrónimos
  const acr = new Set(["RUT", "RUES", "ESAL", "CCT", "RTE", "CCT"]);
  s = s
    .split(" ")
    .map((w) =>
      acr.has(w.toUpperCase())
        ? w.toUpperCase()
        : w.charAt(0).toUpperCase() + w.slice(1)
    )
    .join(" ");
  return s;
};

const byYear = {};
let ok = 0;
for (const url of URLS) {
  const m = url.match(/\/uploads\/(\d{4})\//);
  const year = m ? m[1] : "otros";
  const file = basename(url);
  try {
    const res = await fetch(encodeURI(url), { redirect: "follow" });
    if (!res.ok) {
      console.log("FAIL", res.status, file);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const dest = resolve(OUT, year, file);
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, buf);
    (byYear[year] ??= []).push({
      label: prettify(file),
      file: `/documentos/${year}/${file}`,
      size: Math.round(buf.length / 1024),
    });
    ok++;
    console.log("ok  ", year, file, (buf.length / 1024).toFixed(0) + " KB");
  } catch (e) {
    console.log("ERR", file, e.message);
  }
}

const years = Object.keys(byYear)
  .sort()
  .reverse()
  .map((y) => ({ year: y, docs: byYear[y].sort((a, b) => a.label.localeCompare(b.label)) }));
await mkdir(dirname(MANIFEST), { recursive: true });
await writeFile(MANIFEST, JSON.stringify(years, null, 2));
console.log(`\nDescargados ${ok}/${URLS.length} PDFs. Manifiesto: src/data/normatividad.json`);
