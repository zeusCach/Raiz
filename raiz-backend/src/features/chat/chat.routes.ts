import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { postChat } from './chat.controller';

const limiter = rateLimit({
  windowMs: 60_000,
  limit: 10, // 10 preguntas por minuto por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Demasiadas preguntas, intenta en un minuto.' },
});

export const chatRouter = Router();
chatRouter.post('/', limiter, postChat);