import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { connectDB } from '../shared/config/db';
import { embedDocumentos } from '../features/chat/embeddings.client';

const RUTA_FAQ = path.join(process.cwd(), 'src/features/chat/kb/faq-raiz.md');

function trocear(md: string) {
  return md
    .split(/^## /m)
    .slice(1) // descarta el encabezado del archivo
    .map((bloque) => {
      const [titulo, ...resto] = bloque.split('\n');
      // quita los títulos de sección "# ..." que quedan al final del bloque anterior
      const respuesta = resto.filter((l) => !/^# /.test(l)).join('\n').trim();
      return { titulo: titulo.trim(), respuesta };
    })
    .filter((b) => b.titulo && b.respuesta);
}

async function main() {
  const chunks = trocear(fs.readFileSync(RUTA_FAQ, 'utf-8'));
  console.log(`Fragmentos encontrados: ${chunks.length}`);

  const textos = chunks.map((c) => `${c.titulo}\n${c.respuesta}`);
  const vectores = await embedDocumentos(textos);

  await connectDB();
  const col = mongoose.connection.collection('kb_chunks');
  await col.deleteMany({});
  await col.insertMany(
    chunks.map((c, i) => ({ titulo: c.titulo, texto: textos[i], embedding: vectores[i] })),
  );

  console.log(`Indexados ${chunks.length} fragmentos (${vectores[0].length} dimensiones)`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});