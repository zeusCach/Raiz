import { mockPosts } from './mockPosts';
import type { PostCultura, CrearPostCulturaPayload } from '../types/postCultura.types';

// Mismo arreglo que ya usa usePosts/usePost — lo mutamos en memoria
let posts: PostCultura[] = [...mockPosts];

//obtenemos los datos de nuestro store
export function getStoredPosts(): PostCultura[] {
  return posts;
}

export function addStoredPost(payload: CrearPostCulturaPayload): PostCultura {
  const nuevoPost = {
    ...payload,
    _id: crypto.randomUUID(),
    autor: { _id: 'local-user', nombre: 'Tú' }, // placeholder hasta que exista auth real
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...(payload.tipo === 'foro' ? { comentariosCount: 0 } : {}),
  } as PostCultura;

  posts = [nuevoPost, ...posts]; // lo más nuevo primero
  return nuevoPost;
}