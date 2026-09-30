// features/comunidades/hooks/useComunidadPosts.ts
import { useState, useEffect } from 'react';
import { fetchPosts } from '../../postCultura/services/postCultura.api';
import type { PostCultura } from '../../postCultura/types/postCultura.types';

export function useComunidadPosts(comunidadId: string | undefined) {
  const [posts, setPosts] = useState<PostCultura[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!comunidadId) return;
    let cancelado = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    fetchPosts(undefined, undefined, comunidadId)
      .then((data) => {
        if (!cancelado) setPosts(data);
      })
      .finally(() => {
        if (!cancelado) setLoading(false);
      });
    return () => {
      cancelado = true;
    };
  }, [comunidadId]);

  return { posts, loading };
}