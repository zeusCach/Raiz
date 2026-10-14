const API_URL = import.meta.env.VITE_API_URL;

export async function enviarMensaje(mensaje: string): Promise<string> {
  const res = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mensaje }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message ?? 'No se pudo contactar al asistente.');
  return data.respuesta as string;
}