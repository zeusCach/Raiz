import { useCallback, useState } from "react";
import { enviarMensaje } from "../services/chat.api";

export type Mensaje = {
  id: string;
  rol: "usuario" | "bot";
  texto: string;
  error?: boolean;
};

let contador = 0;
// crypto.randomUUID() solo existe en HTTPS o localhost; este id basta para las keys de React
const nuevoId = () => `m-${Date.now()}-${contador++}`;

const BIENVENIDA: Mensaje = {
  id: "bienvenida",
  rol: "bot",
  texto:
    "Hola, soy el asistente de Raíz. Pregúntame sobre el registro, los tipos de publicación, donaciones o soporte.",
};

export function useChat() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([BIENVENIDA]);
  const [enviando, setEnviando] = useState(false);

  const enviar = useCallback(
    async (texto: string) => {
      const limpio = texto.trim();
      if (!limpio || enviando) return;

      setMensajes((m) => [...m, { id: nuevoId(), rol: "usuario", texto: limpio }]);
      setEnviando(true);
      try {
        const respuesta = await enviarMensaje(limpio);
        setMensajes((m) => [...m, { id: nuevoId(), rol: "bot", texto: respuesta }]);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Ocurrió un error.";
        setMensajes((m) => [...m, { id: nuevoId(), rol: "bot", texto: msg, error: true }]);
      } finally {
        setEnviando(false);
      }
    },
    [enviando],
  );

  return { mensajes, enviando, enviar };
}