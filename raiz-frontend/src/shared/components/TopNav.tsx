import { FiHome, FiMessageCircle } from 'react-icons/fi';
import { FaHandshake, FaHandsHelping, FaHandHoldingHeart } from 'react-icons/fa';
import { useCategoryFilterStore } from '../../features/feed/store/categoryFilterStore';
import type { TipoPost } from '../../features/postCultura/schema/post.schema';

const NAV_ITEMS: { Icon: React.ComponentType<{ className?: string }>; label: string; key: string; tipo: TipoPost | null }[] = [
  { Icon: FiHome, label: 'Inicio', key: 'inicio', tipo: null },
  { Icon: FiMessageCircle, label: 'Foro', key: 'foro', tipo: 'foro' },
  { Icon: FaHandshake, label: 'Reuniones', key: 'reuniones', tipo: 'reunion' },
  { Icon: FaHandsHelping, label: 'Colaboraciones', key: 'colaboraciones', tipo: 'colaboracion' },
  { Icon: FaHandHoldingHeart, label: 'Donaciones', key: 'donaciones', tipo: 'donacion' },
];

export function TopNav() {
  const tipoActivo = useCategoryFilterStore((state) => state.tipo);
  const setTipo = useCategoryFilterStore((state) => state.setTipo);

  return (
    <nav className="hidden justify-center gap-1 border-b border-arcilla bg-papel px-4 md:flex">
      {NAV_ITEMS.map(({ Icon, label, key, tipo }) => (
        <button
          key={key}
          onClick={() => setTipo(tipo)}
          className={`flex flex-col items-center gap-0.5 border-b-2 px-4 py-2.5 text-xs font-medium transition ${
            tipoActivo === tipo
              ? 'border-verde text-verde'
              : 'border-transparent text-tinta/60 hover:text-tinta'
          }`}
        >
          <Icon className="h-5 w-5" />
          {label}
        </button>
      ))}
    </nav>
  );
}