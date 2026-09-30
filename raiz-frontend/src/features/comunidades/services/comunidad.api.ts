import type { ComunidadResumen, ComunidadDetalle } from '../types/comunidad.types';

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchComunidades(): Promise<ComunidadResumen[]> {
  const res = await fetch(`${API_URL}/comunidades`);
  if (!res.ok) throw new Error('Error al obtener las comunidades');
  return res.json();
}

export async function fetchComunidadById(id: string): Promise<ComunidadDetalle> {
  const res = await fetch(`${API_URL}/comunidades/${id}`);
  if (!res.ok) throw new Error('Comunidad no encontrada');
  return res.json();
}

export async function crearComunidad(nombre: string, descripcion: string): Promise<ComunidadResumen> {
  const res = await fetch(`${API_URL}/comunidades`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ nombre, descripcion }),
  });
  if (!res.ok) throw new Error('No se pudo crear la comunidad');
  return res.json();
}

export async function unirseComunidad(id: string): Promise<ComunidadDetalle> {
  const res = await fetch(`${API_URL}/comunidades/${id}/unirse`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('No se pudo unir a la comunidad');
  return res.json();
}

export async function salirComunidad(id: string): Promise<ComunidadDetalle> {
  const res = await fetch(`${API_URL}/comunidades/${id}/salir`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('No se pudo salir de la comunidad');
  return res.json();
}

export async function actualizarBannerComunidad(id: string, bannerUrl: string): Promise<ComunidadDetalle> {
  
  const res = await fetch(`${API_URL}/comunidades/${id}/banner`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ bannerUrl }),
  });

  if (!res.ok) throw new Error('No se pudo actualizar el banner');
  return res.json();
}