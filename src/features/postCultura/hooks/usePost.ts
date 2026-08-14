// features/postCultura/hooks/usePost.ts
import { useState, useEffect, useCallback } from 'react';
import { fetchPostById } from '../services/postCultura.api';
import { mockPosts } from '../data/mockPosts';
import type { PostCultura } from '../types/postCultura.types';

const USE_MOCK = true; // misma bandera que en usePosts

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
        const encontrado = mockPosts.find((p) => p._id === id) ?? null;
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