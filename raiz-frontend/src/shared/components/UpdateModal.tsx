import { FiX, FiGift } from 'react-icons/fi';
import { useUpdateNotice } from '../hooks/useUpdateNotice';

export function UpdateModal() {
  const { visible, cerrar, entrada } = useUpdateNotice();

  if (!visible || !entrada) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-tinta/30 p-4 sm:items-center">
      <div
        className="w-full max-w-sm rounded-2xl bg-papel p-6 shadow-xl"
        style={{ animation: 'fade-in-up 0.3s ease-out both' }}
      >
        <div className="flex items-start justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-verde/15 text-verde">
            <FiGift className="h-5 w-5" />
          </span>
          <button onClick={cerrar} className="rounded-full p-1.5 hover:bg-arcilla/30">
            <FiX className="h-5 w-5 text-tinta/60" />
          </button>
        </div>

        <h2 className="mt-3 font-display text-lg font-bold text-tinta">Hay una actualización</h2>
        <p className="text-xs text-tinta/50">
          {entrada.titulo} · v{entrada.version}
        </p>

        <ul className="mt-4 flex flex-col gap-2">
          {entrada.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-tinta/70">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ocre" />
              {item}
            </li>
          ))}
        </ul>

        <button
          onClick={cerrar}
          className="mt-6 w-full rounded-full bg-verde px-4 py-2.5 text-sm font-semibold text-papel transition hover:bg-verde-light"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}