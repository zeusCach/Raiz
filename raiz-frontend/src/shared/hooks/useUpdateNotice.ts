import { useEffect, useState } from 'react';
import { CHANGELOG } from '../data/changelog';

const STORAGE_KEY = 'raiz_last_seen_version';

export function useUpdateNotice() {
  const [visible, setVisible] = useState(false);
  const ultimaVersion = CHANGELOG[0]?.version;

  useEffect(() => {
    if (!ultimaVersion) return;
    const vista = localStorage.getItem(STORAGE_KEY);
    if (vista !== ultimaVersion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, [ultimaVersion]);

  function cerrar() {
    if (ultimaVersion) localStorage.setItem(STORAGE_KEY, ultimaVersion);
    setVisible(false);
  }

  return { visible, cerrar, entrada: CHANGELOG[0] };
}