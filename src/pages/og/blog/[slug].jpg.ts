// Imagen Open Graph (1200x630) de cada entrada del blog, generada al construir.
// Las portadas suelen ser afiches verticales: WhatsApp/Facebook las recortan mal
// o las descartan si pasan de ~300 KB. Aquí el afiche va completo y centrado
// sobre un fondo desenfocado de sí mismo, en un JPEG liviano.
import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const W = 1200;
const H = 630;

export const getStaticPaths = (async () => {
  const posts = await getCollection("blog", ({ data }) => !data.draft && !!data.cover);
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { cover: post.data.cover! },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const src = await readFile(resolve("public", props.cover.replace(/^\//, "")));

  const background = await sharp(src)
    .resize(W, H, { fit: "cover" })
    .blur(28)
    .modulate({ brightness: 0.55 })
    .toBuffer();

  const poster = await sharp(src)
    .resize({ height: H - 40, width: W - 40, fit: "inside" })
    .toBuffer();

  const image = await sharp(background)
    .composite([{ input: poster, gravity: "center" }])
    .jpeg({ quality: 78, mozjpeg: true })
    .toBuffer();

  return new Response(new Uint8Array(image), { headers: { "Content-Type": "image/jpeg" } });
};
