import { useState } from 'react';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { useCategoryFilterStore } from '../../features/feed/store/categoryFilterStore';
import { MoreMenu } from './MoreMenu';
import type { TipoPost } from '../../features/postCultura/schema/post.schema';

const NAV_ITEMS: { icon: string; label: string; key: string; tipo: TipoPost | null }[] = [
  { icon: '🏠', label: 'Inicio', key: 'inicio', tipo: null },
  { icon: '💬', label: 'Foro', key: 'foro', tipo: 'foro' },
  { icon: '🤝', label: 'Reuniones', key: 'reuniones', tipo: 'reunion' },
];

export function BottomNav() {
  const tipoActivo = useCategoryFilterStore((state) => state.tipo);
  const setTipo = useCategoryFilterStore((state) => state.setTipo);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const visible = useScrollDirection();

  return (
    <>
      {menuAbierto && <MoreMenu onClose={() => setMenuAbierto(false)} />}

      <nav
        className={`fixed inset-x-0 bottom-0 z-40 flex justify-around border-t border-arcilla bg-papel px-2 pt-2 transition-transform duration-300 md:hidden ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setTipo(item.tipo);
              setMenuAbierto(false);
            }}
            className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-xs font-medium transition ${
              tipoActivo === item.tipo ? 'text-verde' : 'text-tinta/50'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </button>
        ))}

        <button
          onClick={() => setMenuAbierto((v) => !v)}
          className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-xs font-medium transition ${
            menuAbierto ? 'text-verde' : 'text-tinta/50'
          }`}
        >
          <span className="text-xl">☰</span>
          Más
        </button>
      </nav>
    </>
  );
}