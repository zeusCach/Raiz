import { useCategoryFilterStore } from '../../features/feed/store/categoryFilterStore';
import type { TipoPost } from '../../features/postCultura/schema/post.schema';

const NAV_ITEMS: { icon: string; label: string; key: string; tipo: TipoPost | null }[] = [
  { icon: '🏠', label: 'Inicio', key: 'inicio', tipo: null },
  { icon: '💬', label: 'Foro', key: 'foro', tipo: 'foro' },
  { icon: '🤝', label: 'Reuniones', key: 'reuniones', tipo: 'reunion' },
  { icon: '✋', label: 'Colaboraciones', key: 'colaboraciones', tipo: 'colaboracion' },
  { icon: '🌾', label: 'Donaciones', key: 'donaciones', tipo: 'donacion' },
];

export function TopNav() {
  const tipoActivo = useCategoryFilterStore((state) => state.tipo);
  const setTipo = useCategoryFilterStore((state) => state.setTipo);

  return (
    <nav className="hidden justify-center gap-1 border-b border-arcilla bg-papel px-4 md:flex">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.key}
          onClick={() => setTipo(item.tipo)}
          className={`flex flex-col items-center gap-0.5 border-b-2 px-4 py-2.5 text-xs font-medium transition ${
            tipoActivo === item.tipo
              ? 'border-verde text-verde'
              : 'border-transparent text-tinta/60 hover:text-tinta'
          }`}
        >
          <span className="text-lg">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>
  );
}