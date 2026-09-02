import type { PostCultura } from "../types/postCultura.types";

export const mockPosts: PostCultura[] = [
  {
    _id: "1",
    tipo: "reunion",
    titulo: "Ruta MTB nocturna por el centro de Felipe Carrillo Puerto",
    descripcion:
      "Salida grupal en bici de montaña, ritmo tranquilo, ideal para todos los niveles. Llevar luces y casco obligatorio.",
    autor: { _id: "u5", nombre: "Rodada FCP" },
    imagenUrl:
      "https://eurobike.mx/cdn/shop/articles/KTM_Bikes-img2_1600x.jpg?v=1707841633",
    ubicacion: "Felipe Carrillo Puerto",
    createdAt: "2026-08-06T18:00:00Z",
    updatedAt: "2026-08-06T18:00:00Z",
    fecha: "2026-08-15",
    hora: "19:30",
    lugar: "Parque Benito Juárez (punto de partida)",
    cupoMaximo: 15,
    whatsappContacto: "529831234567",
  },
  {
    _id: "2",
    tipo: "donacion",
    titulo: "Apoyo para reconstrucción de palapa comunitaria",
    descripcion:
      "Necesitamos material y manos para reparar el techo tras las lluvias de la semana pasada.",
    autor: { _id: "u2", nombre: "Zeus Chan" },
    createdAt: "2026-08-05T09:00:00Z",
    updatedAt: "2026-08-05T09:00:00Z",
    metaDescripcion: "Palma, madera, o mano de obra",
    whatsappContacto: "529831234567",
    urgente: true,
  },
  {
    _id: "3",
    tipo: "foro",
    titulo: '¿Cómo se dice "buenos días" en maya en su comunidad?',
    descripcion:
      "Cada región tiene variaciones lindas. Comparte cómo lo dicen en la tuya.",
    autor: { _id: "u3", nombre: "Lucía Poot" },
    createdAt: "2026-08-03T08:30:00Z",
    updatedAt: "2026-08-03T08:30:00Z",
    categoria: "lengua maya",
    comentariosCount: 12,
  },
  {
    _id: "4",
    tipo: "colaboracion",
    titulo: "Buscamos apoyo para documentar recetas tradicionales",
    descripcion:
      "Proyecto para preservar recetas de abuelas de la región antes de que se pierdan.",
    autor: { _id: "u4", nombre: "Raíz Editorial" },
    createdAt: "2026-08-04T14:00:00Z",
    updatedAt: "2026-08-04T14:00:00Z",
    habilidadesRequeridas: ["fotografía", "redacción", "edición de video"],
    whatsappContacto: "529831234567",
    vigenteHasta: "2026-09-30",
  },
];
