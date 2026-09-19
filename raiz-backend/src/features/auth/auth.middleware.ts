// src/shared/middlewares/auth.middleware.ts
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../features/auth/auth.model';
import { env } from '../../shared/config/env';

declare global {
  namespace Express {
    interface Request {
      user?: { _id: string; nombre: string; email: string };
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      res.status(401).json({ message: 'No autenticado' });
      return;
    }

    const payload = jwt.verify(token, env.jwtSecret) as { sub: string };
    const user = await User.findById(payload.sub).select('nombre email');
    if (!user) {
      res.status(401).json({ message: 'No autenticado' });
      return;
    }

    req.user = { _id: user._id.toString(), nombre: user.nombre, email: user.email };
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
}