import fs from 'fs';
import mongoose from 'mongoose';
import { connectDB } from '../shared/config/db';
import { CASOS, Caso } from './casos-eval';
import { responderPregunta } from '../features/chat/chat.service';


const espera = (ms: number) => new Promise((r) => setTimeout(r, ms));
const norm = (t: string) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

function evaluar(c: Caso, fuente: string, respuesta: string): boolean {
  const n = norm(respuesta);
  const compacto = n.replace(/[\s+\-]/g, '');
  if (c.tipo === 'donacion') return fuente === 'plantilla';
  if (c.tipo === 'fuera') return fuente === 'sin_contexto' || respuesta.includes('wa.me');
  return (
    fuente === 'llm' &&
    !respuesta.includes('No tengo esa información') &&
    (c.palabras ?? []).some((p) => n.includes(p) || compacto.includes(p))
  );
}

async function main() {
  await connectDB();
  const resultados: any[] = [];

  for (const c of CASOS) {
    let fuente = 'error', score: number | null = null, respuesta = '';
    try {
      const r = await responderPregunta(c.pregunta);
      fuente = r.fuente; score = r.score; respuesta = r.respuesta;
    } catch (e) {
      respuesta = e instanceof Error ? e.message : 'error';
    }
    const ok = fuente !== 'error' && evaluar(c, fuente, respuesta);

    resultados.push({ ...c, fuente, score, ok, respuesta });
    console.log(`${ok ? '✔' : '✘'} [${c.tipo}] ${fuente} ${score?.toFixed(2) ?? '-'}  ${c.pregunta}`);

    if(fuente === 'error') console.log(`→ ${respuesta.slice(0, 250)}`)
    await espera(7000);
  }

  const total = resultados.filter((r) => r.ok).length;
  console.log(`\nAciertos: ${total}/${resultados.length}`);
  for (const t of ['faq', 'fuera', 'donacion']) {
    const g = resultados.filter((r) => r.tipo === t);
    console.log(`  ${t}: ${g.filter((r) => r.ok).length}/${g.length}`);
  }

  const sFaq = resultados.filter((r) => r.tipo === 'faq' && r.score != null).map((r) => r.score);
  const sFuera = resultados.filter((r) => r.tipo === 'fuera' && r.score != null).map((r) => r.score);
  if (sFaq.length && sFuera.length) {
    console.log(`\nScore mínimo en preguntas del FAQ: ${Math.min(...sFaq).toFixed(2)}`);
    console.log(`Score máximo en preguntas fuera del FAQ: ${Math.max(...sFuera).toFixed(2)}`);
    console.log('RAG_MIN_SCORE ideal: entre esos dos valores');
  }

  fs.writeFileSync('eval-resultados.json', JSON.stringify(resultados, null, 2));
  await mongoose.disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });