import { GoogleGenAI } from '@google/genai';
import { env } from '../../shared/config/env';

const ai = new GoogleGenAI({ apiKey: env.geminiApiKey });

async function embed(textos: string[], taskType: 'RETRIEVAL_DOCUMENT' | 'RETRIEVAL_QUERY') {
  const res = await ai.models.embedContent({
    model: env.geminiEmbeddingModel,
    contents: textos,
    config: { taskType, outputDimensionality: env.embeddingDims },
  });
  return (res.embeddings ?? []).map((e) => e.values ?? []);
}

export const embedDocumentos = (textos: string[]) => embed(textos, 'RETRIEVAL_DOCUMENT');

export async function embedPregunta(texto: string) {
  return (await embed([texto], 'RETRIEVAL_QUERY'))[0];
}