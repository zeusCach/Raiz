import { useState, useEffect, useCallback } from 'react';
import { fetchPosts } from '../services/postCultura.api';
import { mockPosts } from '../data/mockPosts';
import type { PostCultura, TipoPost } from '../types/postCultura.types';

const USE_MOCK = true; // 👈 cambia a false cuando tengas el backend listo

export function usePosts(tipo?: TipoPost) {
  const [posts, setPosts] = useState<PostCultura[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 300)); // simula latencia real
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarPosts();
  }, [cargarPosts]);

  return { posts, loading, error, refetch: cargarPosts };
}