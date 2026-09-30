import { useState, useEffect } from 'react';
import { fetchComunidadById } from '../services/comunidad.api';
import type { ComunidadDetalle } from '../types/comunidad.types';

export function useComunidad(id: string | undefined) {
  const [comunidad, setComunidad] = useState<ComunidadDetalle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelado = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError(null);
    fetchComunidadById(id)
      .then((data) => {
        if (!cancelado) setComunidad(data);
      })
      .catch((err) => {
        if (!cancelado) setError(err instanceof Error ? err.message : 'Error desconocido');
      })
      .finally(() => {
        if (!cancelado) setLoading(false);
      });
    return () => {
      cancelado = true;
    };
  }, [id]);

  return { comunidad, loading, error, setComunidad };
}