import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiMessageCircle, FiMoreHorizontal } from 'react-icons/fi';
import { FaHandshake } from 'react-icons/fa';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { useCategoryFilterStore } from '../../features/feed/store/categoryFilterStore';
import { MoreMenu } from './MoreMenu';
import type { TipoPost } from '../../features/postCultura/schema/post.schema';

const NAV_ITEMS: { Icon: React.ComponentType<{ className?: string }>; label: string; key: string; tipo: TipoPost | null }[] = [
  { Icon: FiHome, label: 'Inicio', key: 'inicio', tipo: null },
  { Icon: FiMessageCircle, label: 'Foro', key: 'foro', tipo: 'foro' },
  { Icon: FaHandshake, label: 'Reuniones', key: 'reuniones', tipo: 'reunion' },
];

export function BottomNav() {
  const tipoActivo = useCategoryFilterStore((state) => state.tipo);
  const setTipo = useCategoryFilterStore((state) => state.setTipo);
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const visible = useScrollDirection();

  function handleClick(tipo: TipoPost | null) {
    setTipo(tipo);
    setMenuAbierto(false);
    navigate('/feed');
  }

  return (
    <>
      {menuAbierto && <MoreMenu onClose={() => setMenuAbierto(false)} />}

      <nav
        className={`fixed inset-x-0 bottom-0 z-40 flex justify-around border-t border-arcilla bg-papel px-2 pt-2 transition-transform duration-300 md:hidden ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      >
        {NAV_ITEMS.map(({ Icon, label, key, tipo }) => (
          <button
            key={key}
            onClick={() => handleClick(tipo)}
            className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-xs font-medium transition ${
              tipoActivo === tipo ? 'text-verde' : 'text-tinta/50'
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </button>
        ))}

        <button
          onClick={() => setMenuAbierto((v) => !v)}
          className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-xs font-medium transition ${
            menuAbierto ? 'text-verde' : 'text-tinta/50'
          }`}
        >
          <FiMoreHorizontal className="h-5 w-5" />
          Más
        </button>
      </nav>
    </>
  );
}