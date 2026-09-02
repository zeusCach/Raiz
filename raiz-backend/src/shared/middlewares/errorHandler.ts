
import type { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);

  if (err instanceof Error) {
    // Errores de validación de Mongoose (ej. falta un campo requerido)
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: err.message });
      return;
    }
    // ID mal formado en una ruta tipo /api/posts/:id
    if (err.name === 'CastError') {
      res.status(400).json({ message: 'ID inválido' });
      return;
    }
  }

  res.status(500).json({ message: 'Error interno del servidor' });
}