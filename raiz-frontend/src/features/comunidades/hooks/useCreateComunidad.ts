import { useState, useCallback } from 'react';
import { crearComunidad } from '../services/comunidad.api';
import type { ComunidadResumen } from '../types/comunidad.types';

export function useCreateComunidad() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const crear = useCallback(async (nombre: string, descripcion: string): Promise<ComunidadResumen | null> => {
    setLoading(true);
    setError(null);
    try {
      return await crearComunidad(nombre, descripcion);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la comunidad');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { crear, loading, error };
}