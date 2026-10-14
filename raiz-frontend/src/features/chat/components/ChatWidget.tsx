import { useEffect, useRef, useState } from 'react';
import { useChat } from '../hooks/useChat';

const TOKENS = /(\*\*[^*]+\*\*|https?:\/\/[^\s)]+)/g;

// Convierte **negritas** y enlaces en elementos, sin dangerouslySetInnerHTML
function renderTexto(texto: string) {
  return texto.split(TOKENS).map((parte, i) => {
    if (parte.startsWith('**') && parte.endsWith('**') && parte.length > 4) {
      return <strong key={i}>{parte.slice(2, -2)}</strong>;
    }
    if (/^https?:\/\//.test(parte)) {
      const url = parte.replace(/[.,;]+$/, '');
      const resto = parte.slice(url.length);
      return (
        <span key={i}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all font-medium text-verde underline"
          >
            {url.includes('wa.me') ? 'Abrir WhatsApp' : url}
          </a>
          {resto}
        </span>
      );
    }
    return parte;
  });
}

export function ChatWidget() {
  const [abierto, setAbierto] = useState(false);
  const [entrada, setEntrada] = useState('');
  const { mensajes, enviando, enviar } = useChat();
  const finRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [mensajes, enviando, abierto]);

  useEffect(() => {
    if (abierto) inputRef.current?.focus();
  }, [abierto]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!entrada.trim() || enviando) return;
    void enviar(entrada);
    setEntrada('');
  }

  return (
    <>
      {abierto && (
        <section
          aria-label="Asistente de Raíz"
          onKeyDown={(e) => e.key === 'Escape' && setAbierto(false)}
          className="fixed right-4 bottom-[calc(max(0.5rem,env(safe-area-inset-bottom))_+_9rem)] z-50 flex h-[28rem] max-h-[calc(100dvh-14rem)] w-[22rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-arcilla bg-papel shadow-xl md:right-6 md:bottom-24 md:max-h-none md:max-w-[calc(100vw-3rem)]"

        >
          <header className="flex items-center justify-between bg-verde px-4 py-3 text-papel">
            <h2 className="font-display text-base font-semibold">Asistente de Raíz</h2>
            <button
              type="button"
              onClick={() => setAbierto(false)}
              aria-label="Cerrar chat"
              className="rounded-full px-2 text-xl leading-none hover:bg-papel/20"
            >
              ×
            </button>
          </header>

          <div role="log" aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {mensajes.map((m) => (
              <div key={m.id} className={`flex ${m.rol === 'usuario' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                    m.rol === 'usuario'
                      ? 'bg-verde text-papel'
                      : m.error
                        ? 'border border-terracota/30 bg-terracota/10 text-terracota'
                        : 'border border-arcilla bg-white/70 text-tinta'
                  }`}
                >
                  {m.rol === 'bot' ? renderTexto(m.texto) : m.texto}
                </div>
              </div>
            ))}
            {enviando && <p className="text-sm text-tinta/50">Escribiendo...</p>}
            <div ref={finRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-arcilla p-3">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={entrada}
                onChange={(e) => setEntrada(e.target.value)}
                maxLength={500}
                placeholder="Escribe tu duda..."
                aria-label="Tu pregunta"
                className="min-w-0 flex-1 rounded-full border border-arcilla bg-white/60 px-4 py-2 text-sm text-tinta placeholder:text-tinta/40 focus:outline-none focus:ring-2 focus:ring-verde/40"
              />
              <button
                type="submit"
                disabled={enviando || !entrada.trim()}
                className="rounded-full bg-verde px-4 py-2 text-sm font-semibold text-papel transition hover:bg-verde-light disabled:opacity-50"
              >
                Enviar
              </button>
            </div>
            <p className="mt-2 text-center text-xs text-tinta/50">
              No compartas datos personales en este chat.
            </p>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-label={abierto ? 'Cerrar asistente' : 'Abrir asistente de Raíz'}
        aria-expanded={abierto}
        className="fixed right-4 bottom-[calc(max(0.5rem,env(safe-area-inset-bottom))_+_4.5rem)] z-50 flex h-14 w-14 items-center justify-center rounded-full bg-verde text-papel shadow-lg transition hover:bg-verde-light focus:outline-none focus-visible:ring-4 focus-visible:ring-verde/40 md:right-6 md:bottom-6"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
        </svg>
      </button>
    </>
  );
}