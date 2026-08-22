import { useState, useEffect, useCallback } from 'react';
import { fetchPosts } from '../services/postCultura.api';
import { mockPosts } from '../data/mockPosts';
import type { PostCultura } from '../types/postCultura.types';
import type { TipoPost } from '../schema/post.schema';

const USE_MOCK = true; // cambia a false cuando tengas el backend listo

export function usePosts(tipo?: TipoPost) {
  const [posts, setPosts] = useState<PostCultura[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 300));
        const filtrados = tipo ? mockPosts.filter((p) => p.tipo === tipo) : mockPosts;
        setPosts(filtrados);
      } else {
        const data = await fetchPosts(tipo);
        setPosts(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, [tipo]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void cargarPosts();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [cargarPosts]);

  return { posts, loading, error, refetch: cargarPosts };
}