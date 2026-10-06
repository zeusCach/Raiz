import { PostCultura } from './postCultura.model';

// Obtiene las publicaciones aplicando filtros opcionales.
export async function getPosts(tipo?: string, autor?: string, comunidadId?: string) {
  // Crea un filtro vacío para la búsqueda.
  const filter: Record<string, unknown> = {};

  // Agrega el filtro por tipo si fue proporcionado.
  if (tipo) filter.tipo = tipo;

  // Agrega el filtro por autor si fue proporcionado.
  if (autor) filter['autor._id'] = autor;

  // Agrega el filtro por comunidad si fue proporcionado.
  if (comunidadId) filter.comunidadId = comunidadId;

  // Busca las publicaciones, las ordena de más recientes a más antiguas
  // y obtiene el nombre y creador de la comunidad.
  const posts = await PostCultura.find(filter)
    .sort({ createdAt: -1 })
    .populate('comunidadId', 'nombre creador');

  // Recorre las publicaciones para adaptar los datos de la comunidad.
  return posts.map((post) => {
    // Convierte el documento de Mongoose en un objeto normal.
    const obj: any = post.toObject();

    // Comprueba si existe una comunidad asociada.
    if (obj.comunidadId && typeof obj.comunidadId === 'object') {
      // Agrega el nombre de la comunidad al resultado.
      obj.comunidadNombre = obj.comunidadId.nombre;

      // Agrega el ID del creador de la comunidad.
      obj.comunidadCreadorId = obj.comunidadId.creador.toString();

      // Convierte el ID de la comunidad a string.
      obj.comunidadId = obj.comunidadId._id.toString();
    }

    // Devuelve la publicación adaptada.
    return obj;
  });
}

// Busca una publicación específica por su ID.
export async function getPostById(id: string) {
  // Busca y devuelve la publicación encontrada.
  return PostCultura.findById(id);
}

// Crea una nueva publicación con los datos proporcionados.
export async function createPost(data: Record<string, unknown>) {
  // Guarda la nueva publicación en la base de datos.
  return PostCultura.create(data);
}

// Verifica si el usuario tiene permiso para modificar o eliminar una publicación.
export async function puedeModificar(postId: string, userId: string): Promise<boolean> {
  // Busca la publicación por su ID.
  const post = await PostCultura.findById(postId);

  // Si no existe, deniega el permiso.
  if (!post) return false;

  // Comprueba si el usuario es el autor de la publicación.
  if (post.autor._id.toString() === userId) return true;

  // Comprueba si la publicación pertenece a una comunidad.
  if (post.comunidadId) {
    // Importa el modelo de Comunidad cuando se necesita.
    const { Comunidad } = await import('../comunidad/comunidad.model');

    // Busca la comunidad relacionada con la publicación.
    const comunidad = await Comunidad.findById(post.comunidadId);

    // Comprueba si el usuario es el creador de la comunidad.
    if (comunidad && comunidad.creador.toString() === userId) return true;
  }

  // Si no es autor ni creador de la comunidad, deniega el permiso.
  return false;
}

// Actualiza una publicación con los datos proporcionados.
export async function actualizarPost(id: string, data: Record<string, unknown>) {
  // Busca la publicación, aplica los cambios y devuelve el documento actualizado.
  return PostCultura.findByIdAndUpdate(id, data, { new: true });
}

// Elimina una publicación por su ID.
export async function eliminarPost(id: string) {
  // Busca la publicación y la elimina de la base de datos.
  return PostCultura.findByIdAndDelete(id);
}