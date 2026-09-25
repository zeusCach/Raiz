// features/auth/services/auth.api.ts
import type { RegistroFormData, LoginFormData } from '../schema/auth.schema';

const API_URL = import.meta.env.VITE_API_URL;

export interface AuthUser {
  _id: string;
  nombre: string;
  email: string;
  siguiendo: string[];
}

export interface PerfilPublico {
  _id: string;
  nombre: string;
  createdAt: string;
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