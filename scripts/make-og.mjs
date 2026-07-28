// Genera la imagen Open Graph (1200x630) para compartir en redes.
import sharp from "sharp";
import { resolve } from "node:path";

const W = 1200;
const H = 630;
const photo = resolve("src/assets/img/content/pi2.jpg");
const out = resolve("public/og-image.jpg");

const base = await sharp(photo)
  .resize(W, H, { fit: "cover", position: "top" })
  .toBuffer();

const overlay = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0.35">
      <stop offset="0" stop-color="#4a141c" stop-opacity="0.96"/>
      <stop offset="0.55" stop-color="#4a141c" stop-opacity="0.82"/>
      <stop offset="1" stop-color="#4a141c" stop-opacity="0.35"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="0" y="${H - 8}" width="${W}" height="8" fill="#b0873f"/>
  <text x="70" y="150" font-family="Georgia, 'Times New Roman', serif"
        font-size="26" fill="#cda24e" letter-spacing="6">ASOCIACIÓN · JUEVES SANTO · TUNJA</text>
  <text x="66" y="285" font-family="Georgia, 'Times New Roman', serif"
        font-size="94" font-weight="700" fill="#f4eddd">Procesión</text>
  <text x="66" y="385" font-family="Georgia, 'Times New Roman', serif"
        font-size="94" font-weight="700" fill="#f4eddd">Infantil</text>
  <text x="70" y="470" font-family="Georgia, 'Times New Roman', serif"
        font-size="34" font-style="italic" fill="#e6d3a3">La fe más querida de Tunja · desde 1960</text>
</svg>`);

await sharp(base)
  .composite([{ input: overlay, top: 0, left: 0 }])
  .jpeg({ quality: 86 })
  .toFile(out);

console.log("OG image generada en public/og-image.jpg");
