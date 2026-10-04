import type { TipoPost } from "../schema/post.schema";
import type {
  CrearPostCulturaPayload,
  PostCultura,
} from "../types/postCultura.types";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchPosts(
  tipo?: TipoPost,
  autor?: string,
  comunidadId?: string,
): Promise<PostCultura[]> {

  const params = new URLSearchParams();

  if (tipo) params.set("tipo", tipo);
  if (autor) params.set("autor", autor);
  if (comunidadId) params.set("comunidad", comunidadId);

  const qs = params.toString();
  const url = qs ? `${API_URL}/posts?${qs}` : `${API_URL}/posts`;
  const res = await fetch(url);

  if (!res.ok) throw new Error("Error al obtener los posts");
  
  return res.json();
}

export async function fetchPostById(id: string): Promise<PostCultura> {
  const res = await fetch(`${API_URL}/posts/${id}`);
  if (!res.ok) throw new Error("Post no encontrado");
  return res.json();
}

export async function createPost(
  payload: CrearPostCulturaPayload,
): Promise<PostCultura> {
  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error al crear el post");
  return res.json();
}


export async function editarPost(
  id: string,
  data: { titulo?: string; descripcion?: string; imagenUrl?: string; ubicacion?: string }
): Promise<PostCultura> {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? 'No se pudo editar la publicación');
  }
  return res.json();
}

export async function eliminarPost(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? 'No se pudo eliminar la publicación');
  }
}