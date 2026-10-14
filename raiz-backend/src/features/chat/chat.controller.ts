// src/features/chat/chat.controller.ts
import { Request, Response } from 'express';
import { responderPregunta } from './chat.service';

export async function postChat(req: Request, res: Response) {
  const { mensaje } = req.body ?? {};
  if (typeof mensaje !== 'string' || !mensaje.trim() || mensaje.length > 500) {
    return res.status(400).json({ message: 'Mensaje inválido (1 a 500 caracteres).' });
  }

  try {
    const inicio = Date.now();
    const resultado = await responderPregunta(mensaje.trim());
    // Solo metadatos: nunca el texto de la pregunta
    console.log(`[chat] fuente=${resultado.fuente} ms=${Date.now() - inicio}`);
    res.json(resultado);
  } catch (err) {
    console.error('[chat] error:', err instanceof Error ? err.message : 'desconocido');
    res.status(502).json({ message: 'El asistente no está disponible por ahora.' });
  }
}