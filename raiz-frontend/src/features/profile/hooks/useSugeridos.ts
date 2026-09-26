import { useState, useEffect } from 'react';
import { fetchSugeridos, type UsuarioSugerido } from '../../auth/services/auth.services';

export function useSugeridos() {
  const [usuarios, setUsuarios] = useState<UsuarioSugerido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelado = false;
    fetchSugeridos()
      .then((data) => {
        if (!cancelado) setUsuarios(data);
      })
      .finally(() => {
        if (!cancelado) setLoading(false);
      });
    return () => {
      cancelado = true;
    };
  }, []);

  return { usuarios, loading };
}