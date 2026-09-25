import type { TipoPost } from "../schema/post.schema";
import type { CrearPostCulturaPayload, PostCultura } from "../types/postCultura.types";


const API_URL = import.meta.env.VITE_API_URL;

export async function fetchPosts(tipo?: TipoPost, autor?: string): Promise<PostCultura[]> {
  const params = new URLSearchParams();

  if (tipo) params.set('tipo', tipo);
  if (autor) params.set('autor', autor);

  const qs = params.toString();
  const url = qs ? `${API_URL}/posts?${qs}` : `${API_URL}/posts`;
  const res = await fetch(url);

  if (!res.ok) throw new Error('Error al obtener los posts');
  return res.json();
}

export async function fetchPostById(id: string): Promise<PostCultura> {
  const res = await fetch(`${API_URL}/posts/${id}`);
  if (!res.ok) throw new Error('Post no encontrado');
  return res.json();
}

export async function createPost(payload: CrearPostCulturaPayload): Promise<PostCultura> {
  const res = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Error al crear el post');
  return res.json();
}