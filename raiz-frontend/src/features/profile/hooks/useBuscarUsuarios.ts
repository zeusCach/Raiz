import { useState, useEffect } from 'react';
import { buscarUsuarios, type UsuarioBusqueda } from '../../auth/services/auth.services';

export function useBuscarUsuarios(query: string) {
  const [usuarios, setUsuarios] = useState<UsuarioBusqueda[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUsuarios([]);
      return;
    }

    let cancelado = false;
    setLoading(true);

    const timeoutId = setTimeout(() => {
      buscarUsuarios(q)
        .then((data) => {
          if (!cancelado) setUsuarios(data);
        })
        .finally(() => {
          if (!cancelado) setLoading(false);
        });
    }, 300);

    return () => {
      cancelado = true;
      clearTimeout(timeoutId);
    };
  }, [query]);

  return { usuarios, loading };
}