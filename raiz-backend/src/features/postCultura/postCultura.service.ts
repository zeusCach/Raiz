
import { PostCultura } from './postCultura.model';

// Obtiene los posts y permite filtrarlos por tipo.
export async function getPosts(tipo?: string, autor?: string) {
  //creamos un filtro vacío para buscar las publicaciones
  const filter: Record<string, unknown> = {};

  //si se recibe un tipo, agregamos el tipo al filtro
  if (tipo) filter.tipo = tipo;

  //si se recibe un autor, agregamos su id al filtro
  if (autor) filter['autor._id'] = autor;

  //buscamos las publicaciones y las ordenamos de la más reciente a la más antigua
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

