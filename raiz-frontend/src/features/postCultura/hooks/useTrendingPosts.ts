// features/postCultura/hooks/useTrendingPosts.ts
import { useState, useEffect } from 'react';
import { fetchPosts } from '../services/postCultura.api';
import type { PostCultura } from '../types/postCultura.types';

const LIMITE = 4;

export function useTrendingPosts() {
  const [posts, setPosts] = useState<PostCultura[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelado = false;

    fetchPosts()
      .then((data) => {
        if (!cancelado) setPosts(data.slice(0, LIMITE));
      })
      .catch(() => {
        if (!cancelado) setPosts([]);
      })
      .finally(() => {
        if (!cancelado) setLoading(false);
      });

    return () => {
      cancelado = true;
    };
  }, []);

  return { posts, loading };
}