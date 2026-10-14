import { env } from '../../shared/config/env';

const URL = 'https://api.groq.com/openai/v1/chat/completions';
const REINTENTOS_MS = [1000, 3000];

export async function generarRespuesta(systemPrompt: string, pregunta: string): Promise<string> {
  for (let intento = 0; ; intento++) {
    const res = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.groqApiKey}`,
      },
      body: JSON.stringify({
        model: env.groqModel,
        temperature: 0.2,
        max_tokens: 1000,
        reasoning_effort: 'low',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: pregunta },
        ],
      }),
    });

    if (res.ok) {
      const data = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const texto = data.choices?.[0]?.message?.content?.trim();
      if (!texto) throw new Error('Respuesta vacía del LLM');
      return texto;
    }

    // Reintenta solo en errores transitorios (429 / 5xx)
    const transitorio = res.status === 429 || res.status >= 500;
    if (transitorio && intento < REINTENTOS_MS.length) {
      await new Promise((r) => setTimeout(r, REINTENTOS_MS[intento]));
      continue;
    }
    throw new Error(`Groq ${res.status}: ${await res.text()}`);
  }
}