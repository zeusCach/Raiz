
import { PostCultura } from './postCultura.model';

// Obtiene los posts y permite filtrarlos por tipo.
export async function getPosts(tipo?: string) {

  // Filtro vacío para obtener todos los posts.
  const filter = tipo ? { tipo } : {};

  // Si se recibe un tipo, se agrega al filtro.
  if (tipo) filter.tipo = tipo;

  // Obtiene los posts ordenados del más reciente al más antiguo.
  return PostCultura.find(filter).sort({ createdAt: -1 });
}

// Busca un post mediante su ID.
export async function getPostById(id: string) {
  // Mongoose busca el documento por su _id.
  return PostCultura.findById(id);
}

// Crea un nuevo post con los datos recibidos.
export async function createPost(
  data: Record<string, unknown>
) {
  // Inserta el nuevo documento en MongoDB.
  return PostCultura.create(data);
}

