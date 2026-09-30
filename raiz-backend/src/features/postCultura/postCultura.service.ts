
import { PostCultura } from './postCultura.model';

// Obtiene los posts y permite filtrarlos por tipo.
export async function getPosts(tipo?: string, autor?: string, comunidadId?: string) {
  const filter: Record<string, unknown> = {};
  if (tipo) filter.tipo = tipo;
  if (autor) filter['autor._id'] = autor;
  if (comunidadId) filter.comunidadId = comunidadId;

  const posts = await PostCultura.find(filter)
    .sort({ createdAt: -1 })
    .populate('comunidadId', 'nombre');

  return posts.map((post) => {
    const obj: any = post.toObject();
    if (obj.comunidadId && typeof obj.comunidadId === 'object') {
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
export async function createPost(
  data: Record<string, unknown>
) {
  // Inserta el nuevo documento en MongoDB.
  return PostCultura.create(data);
}

