// Datos institucionales centrales. Editar aquí actualiza todo el sitio.

export const site = {
  name: "Asociación Procesión Infantil Tunja",
  shortName: "Procesión Infantil Tunja",
  founded: 1960,
  tagline: "La demostración de fe más querida de Tunja",
  description:
    "Asociación que preserva la devoción y tradición católica de la Procesión Infantil del Jueves Santo en Tunja, iniciada por Julita Angulo de Mejía y viva desde 1960.",
  url: "https://procesioninfantiltunja.com",
};

export const contact = {
  address: "Calle 20 # 10-87, Tunja, Boyacá",
  phones: ["312 586 83 27", "300 863 29 73"],
  email: "contactenos@procesioninfantiltunja.com",
  mapsQuery: "Calle 20 %23 10-87, Tunja, Boyacá, Colombia",
};

export type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

export const nav: NavItem[] = [
  {
    label: "La Procesión",
    children: [
      { label: "Nuestra Fundadora", href: "/nuestra-fundadora/" },
      { label: "Nuestra Historia", href: "/nuestra-historia/" },
      { label: "Acompañamientos", href: "/acompanamientos/" },
      { label: "El Recorrido", href: "/recorrido/" },
    ],
  },
  {
    label: "Nosotros",
    children: [
      { label: "Nuestros Objetivos", href: "/objetivos/" },
      { label: "Reconocimientos", href: "/reconocimientos/" },
      { label: "Agradecimientos", href: "/agradecimientos/" },
    ],
  },
  {
    label: "Galería",
    children: [
      { label: "Recorrido Visual Histórico", href: "/galeria/" },
      { label: "Programación Especial", href: "/programacion-especial/" },
    ],
  },
  { label: "Comunidad Clarisa", href: "/comunidad-hermanas-clarisas/" },
  { label: "Normatividad", href: "/normatividad/" },
  { label: "Blog", href: "/blog/" },
];
