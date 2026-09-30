// features/comunidades/hooks/useComunidades.ts
import { useState, useEffect, useCallback } from 'react';
import { fetchComunidades } from '../services/comunidad.api';
import type { ComunidadResumen } from '../types/comunidad.types';

export function useComunidades() {
  const [comunidades, setComunidades] = useState<ComunidadResumen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchComunidades();
      setComunidades(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargar();
  }, [cargar]);

  return { comunidades, loading, error, refetch: cargar };
}