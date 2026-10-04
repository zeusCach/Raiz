import { Comunidad } from "../comunidad/comunidad.model";
import { PostCultura } from "./postCultura.model";

// Obtiene los posts y permite filtrarlos por tipo.
export async function getPosts(
  tipo?: string,
  autor?: string,
  comunidadId?: string,
) {
  const filter: Record<string, unknown> = {};
  if (tipo) filter.tipo = tipo;
  if (autor) filter["autor._id"] = autor;
  if (comunidadId) filter.comunidadId = comunidadId;

  const posts = await PostCultura.find(filter)
    .sort({ createdAt: -1 })
    .populate("comunidadId", "nombre");

  return posts.map((post) => {
    const obj: any = post.toObject();
    if (obj.comunidadId && typeof obj.comunidadId === "object") {
      obj.comunidadNombre = obj.comunidadId.nombre;
      obj.comunidadId = obj.comunidadId._id.toString();
    }
    return obj;
  });
}

// Busca un post mediante su ID.
export async function getPostById(id: string) {
  // Mongoose busca el documento por su _id.
  return PostCultura.findById(id);
}

// Crea un nuevo post con los datos recibidos.
export async function createPost(data: Record<string, unknown>) {
  // Inserta el nuevo documento en MongoDB.
  return PostCultura.create(data);
}

// Verifica si el usuario tiene permiso para modificar o eliminar una publicación.
export async function puedeModificar(
  postId: string,
  userId: string,
): Promise<boolean> {
  // Busca la publicación por su ID.
  const post = await PostCultura.findById(postId);
  if (!post) return false;

  // Comprueba si el usuario es el autor de la publicación.
  if (post.autor._id.toString() === userId) return true;

  // Verifica si la publicación pertenece a una comunidad.
  if (post.comunidadId) {
    // Busca la comunidad correspondiente.
    const comunidad = await Comunidad.findById(post.comunidadId);

    // Comprueba si el usuario es el creador de la comunidad.
    if (comunidad && comunidad.creador.toString() === userId) return true;
  }

  // Deniega el permiso si no cumple ninguna condición.
  return false;
}

// Actualiza una publicación con los datos proporcionados.
export async function actualizarPost(
  id: string,
  data: Record<string, unknown>,
) {
  // Busca la publicación, aplica los cambios y devuelve el documento actualizado.
  return PostCultura.findByIdAndUpdate(id, data, { new: true });
}

// Elimina una publicación por su ID.
export async function eliminarPost(id: string) {
  // Busca la publicación y la elimina de la base de datos.
  return PostCultura.findByIdAndDelete(id);
}
