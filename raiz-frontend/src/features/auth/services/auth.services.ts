// features/auth/services/auth.api.ts
import type { RegistroFormData, LoginFormData } from '../schema/auth.schema';

const API_URL = import.meta.env.VITE_API_URL;

export interface AuthUser {
  _id: string;
  nombre: string;
  email: string;
  siguiendo: string[];
  guardados: string[];
  bio: string;
  formacion: string;
  intereses: string[];
  fotoUrl: string;
  bannerUrl: string;
}

export interface PerfilPublico {
  _id: string;
  nombre: string;
  createdAt: string;
  bio: string;
  formacion: string;
  intereses: string[];
  seguidoresCount: number;
  fotoUrl: string;
  bannerUrl: string;
}

export interface UsuarioSugerido {
  _id: string;
  nombre: string;
  createdAt: string;
}

export interface UsuarioBusqueda {
  _id: string;
  nombre: string;
  fotoUrl?: string;
}

export async function registrarUsuario(data: RegistroFormData): Promise<AuthUser> {
  const res = await fetch(`${API_URL}/auth/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? 'Error al registrarse');
  }
  const { user } = await res.json();
  return user;
}

export async function loginUsuario(data: LoginFormData): Promise<AuthUser> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? 'Error al iniciar sesión');
  }
  const { user } = await res.json();
  return user;
}

export async function logoutUsuario(): Promise<void> {
  await fetch(`${API_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
}

export async function fetchUsuarioActual(): Promise<AuthUser | null> {
  const res = await fetch(`${API_URL}/auth/me`, { credentials: 'include' });
  if (!res.ok) return null;
  const { user } = await res.json();
  return user;
}


export async function fetchPerfilPublico(id: string): Promise<PerfilPublico> {
  //buscamos el perfil público del usuario por su id
  const res = await fetch(`${API_URL}/auth/${id}/perfil`);

  //si no se encuentra el usuario se muestra un error
  if (!res.ok) throw new Error('Usuario no encontrado');

  //obtenemos la información del usuario de la respuesta
  const { usuario } = await res.json();

  //devolvemos el perfil público del usuario
  return usuario;
}

export async function seguirUsuario(id: string): Promise<string[]> {
  //enviamos una solicitud para seguir al usuario
  const res = await fetch(`${API_URL}/auth/${id}/seguir`, {
    method: 'POST',
    credentials: 'include',
  });

  //si la solicitud falla se muestra un error
  if (!res.ok) throw new Error('No se pudo seguir al usuario');

  //obtenemos la lista actualizada de usuarios que seguimos
  const { siguiendo } = await res.json();

  //devolvemos la lista de usuarios que seguimos
  return siguiendo;
}

export async function dejarDeSeguirUsuario(id: string): Promise<string[]> {
  //enviamos una solicitud para dejar de seguir al usuario
  const res = await fetch(`${API_URL}/auth/${id}/dejar-de-seguir`, {
    method: 'POST',
    credentials: 'include',
  });

  //si la solicitud falla se muestra un error
  if (!res.ok) throw new Error('No se pudo dejar de seguir al usuario');

  //obtenemos la lista actualizada de usuarios que seguimos
  const { siguiendo } = await res.json();

  //devolvemos la lista de usuarios que seguimos
  return siguiendo;
}

export async function actualizarMiPerfil(data: {
  bio?: string;
  formacion?: string;
  intereses?: string[];
  fotoUrl?: string;
  bannerUrl?: string;
}): Promise<AuthUser> {

  const res = await fetch(`${API_URL}/auth/me`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('No se pudo actualizar el perfil');

  const { user } = await res.json();
  
  return user;
}


export async function fetchSugeridos(): Promise<UsuarioSugerido[]> {
  //buscamos usuarios sugeridos para el usuario actual
  const res = await fetch(`${API_URL}/auth/sugeridos`, { credentials: 'include' });

  //si ocurre un error devolvemos una lista vacía
  if (!res.ok) return [];

  //obtenemos la lista de usuarios sugeridos
  const { usuarios } = await res.json();

  //devolvemos los usuarios sugeridos
  return usuarios;
}

export async function fetchGuardados(): Promise<import('../../postCultura/types/postCultura.types').PostCultura[]> {
  const res = await fetch(`${API_URL}/auth/guardados`, { credentials: 'include' });
  if (!res.ok) throw new Error('Error al obtener los guardados');
  return res.json();
}

export async function guardarPost(postId: string): Promise<string[]> {
  const res = await fetch(`${API_URL}/auth/posts/${postId}/guardar`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('No se pudo guardar el post');
  const { guardados } = await res.json();
  return guardados;
}

export async function quitarGuardado(postId: string): Promise<string[]> {
  const res = await fetch(`${API_URL}/auth/posts/${postId}/quitar-guardado`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('No se pudo quitar de guardados');
  const { guardados } = await res.json();
  return guardados;
}

export async function buscarUsuarios(query: string): Promise<UsuarioBusqueda[]> {
  const res = await fetch(`${API_URL}/auth/buscar?q=${encodeURIComponent(query)}`, {
    credentials: 'include',
  });
  if (!res.ok) return [];
  const { usuarios } = await res.json();
  return usuarios;
}