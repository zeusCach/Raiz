import { GoogleGenAI } from '@google/genai';
import { env } from '../../shared/config/env';

const ai = new GoogleGenAI({ apiKey: env.geminiApiKey });

export async function generarRespuesta(system: string, pregunta: string): Promise<string> {
  const res = await ai.models.generateContent({
    model: env.geminiModel,
    contents: pregunta,
    config: { systemInstruction: system, temperature: 0.2, maxOutputTokens: 500 },
  });
  return res.text ?? '';
}