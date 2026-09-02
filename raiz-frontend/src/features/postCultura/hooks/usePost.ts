// features/postCultura/hooks/usePost.ts
import { useState, useEffect, useCallback } from 'react';
import { fetchPostById } from '../services/postCultura.api';
import { getStoredPosts } from '../data/postsStore';  // 👈 cambia el import
import type { PostCultura } from '../types/postCultura.types';

const USE_MOCK = false;

export function usePost(id: string | undefined) {
  const [post, setPost] = useState<PostCultura | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarPost = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 300));
        const encontrado = getStoredPosts().find((p) => p._id === id) ?? null;  // 👈 cambia esta línea
        setPost(encontrado);
      } else {
        const data = await fetchPostById(id);
        setPost(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarPost();
  }, [cargarPost]);

  return { post, loading, error, refetch: cargarPost };
}