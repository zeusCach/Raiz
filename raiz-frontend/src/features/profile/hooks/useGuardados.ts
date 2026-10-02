// features/profile/hooks/useGuardados.ts
import { useState, useEffect, useCallback } from 'react';
import { fetchGuardados } from '../../auth/services/auth.services';
import type { PostCultura } from '../../postCultura/types/postCultura.types';

export function useGuardados() {
  const [posts, setPosts] = useState<PostCultura[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGuardados();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let activo = true;

    const cargarInicial = async () => {
      try {
        const data = await fetchGuardados();
        if (activo) setPosts(data);
      } catch (err) {
        if (activo) {
          setError(err instanceof Error ? err.message : 'Error desconocido');
        }
      } finally {
        if (activo) setLoading(false);
      }
    };

    void cargarInicial();
    return () => {
      activo = false;
    };
  }, [cargar]);

  return { posts, loading, error, refetch: cargar };
}