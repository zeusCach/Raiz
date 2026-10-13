import { generarRespuesta } from './llm.client';
import { env } from '../../shared/config/env';

const SYSTEM_PROMPT = `Eres el asistente de Raíz, una plataforma comunitaria de cultura y medio ambiente de Felipe Carrillo Puerto.
Responde en español, breve y claro.
Si no estás seguro de algo, dilo y sugiere contactar por WhatsApp. No inventes datos.`;

const INTENCION_DONACION = /don(ar|aci[oó]n|ativo)|apoyar con/i;

function enlaceWhatsApp(texto: string) {
  return `https://wa.me/${env.whatsappContacto}?text=${encodeURIComponent(texto)}`;
}

export async function responderPregunta(pregunta: string) {
  // Donaciones: plantilla fija, sin pasar por el LLM
  if (INTENCION_DONACION.test(pregunta)) {
    return {
      fuente: 'plantilla' as const,
      respuesta: `Las donaciones se coordinan directamente por WhatsApp: ${enlaceWhatsApp('Hola, quiero donar a través de Raíz')}`,
    };
  }

  const texto = await generarRespuesta(SYSTEM_PROMPT, pregunta);
  return {
    fuente: 'llm' as const,
    respuesta: texto || `No tengo esa información. Escríbenos por WhatsApp: ${enlaceWhatsApp('Hola, tengo una duda sobre Raíz')}`,
  };
}