import mongoose from 'mongoose';
import { connectDB } from '../shared/config/db';

import { CASOS } from './casos-eval';
import { embedPregunta } from '../features/chat/embeddings.client';

async function main() {
  const casos = CASOS.filter((c) => c.tipo !== 'donacion');
  const vectores = await Promise.all(casos.map((c) => embedPregunta(c.pregunta)));

  await connectDB();
  const col = mongoose.connection.collection('kb_chunks');
  const faq: number[] = [];
  const fuera: number[] = [];

  for (let i = 0; i < casos.length; i++) {
    const [top] = await col
      .aggregate<{ titulo: string; score: number }>([
        { $vectorSearch: { index: 'kb_vector_index', path: 'embedding', queryVector: vectores[i], numCandidates: 20, limit: 1 } },
        { $project: { _id: 0, titulo: 1, score: { $meta: 'vectorSearchScore' } } },
      ])
      .toArray();
    const score = top?.score ?? 0;
    (casos[i].tipo === 'faq' ? faq : fuera).push(score);
    console.log(`[${casos[i].tipo}] ${score.toFixed(2)}  ${casos[i].pregunta}  →  ${top?.titulo}`);
  }

  const minFaq = Math.min(...faq);
  const maxFuera = Math.max(...fuera);
  console.log(`\nMínimo FAQ: ${minFaq.toFixed(2)} | Máximo fuera del FAQ: ${maxFuera.toFixed(2)}`);
  console.log(
    minFaq > maxFuera
      ? `Umbral sugerido: ${((minFaq + maxFuera) / 2).toFixed(2)}`
      : 'Se solapan: el umbral solo no basta, el prompt es la segunda defensa',
  );
  await mongoose.disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });