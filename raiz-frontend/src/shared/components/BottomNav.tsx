import { useState } from 'react';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { MoreMenu } from './MoreMenu';

const NAV_ITEMS = [
  { icon: '🏠', label: 'Inicio', key: 'inicio' },
  { icon: '💬', label: 'Foro', key: 'foro' },
  { icon: '🤝', label: 'Reuniones', key: 'reuniones' },
];

export function BottomNav() {
  const [activo, setActivo] = useState('inicio');
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
              setActivo(item.key);
              setMenuAbierto(false);
            }}
            className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-xs font-medium transition ${
              activo === item.key ? 'text-verde' : 'text-tinta/50'
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