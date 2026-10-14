import mongoose from 'mongoose';
import { embedPregunta } from './embeddings.client';
import { env } from '../../shared/config/env';

export type Fragmento = { titulo: string; texto: string; score: number };

export async function buscarFragmentos(pregunta: string) {
  const vector = await embedPregunta(pregunta);

  const resultados = await mongoose.connection
    .collection('kb_chunks')
    .aggregate<Fragmento>([
      {
        $vectorSearch: {
          index: 'kb_vector_index',
          path: 'embedding',
          queryVector: vector,
          numCandidates: 20,
          limit: 4,
        },
      },
      { $project: { _id: 0, titulo: 1, texto: 1, score: { $meta: 'vectorSearchScore' } } },
    ])
    .toArray();

  return {
    mejorScore: resultados[0]?.score ?? 0,
    fragmentos: resultados.filter((r) => r.score >= env.ragMinScore),
  };
}