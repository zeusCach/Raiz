import z from "zod";

export const tipoPostSchema = z.enum([
  "foro",
  "reunion",
  "colaboracion",
  "donacion",
]);


export type TipoPost = z.infer<typeof tipoPostSchema>;