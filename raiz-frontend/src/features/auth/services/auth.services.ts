// features/auth/services/auth.api.ts
import type { RegistroFormData, LoginFormData } from '../schema/auth.schema';

const API_URL = import.meta.env.VITE_API_URL;

export interface AuthUser {
  _id: string;
  nombre: string;
  email: string;
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