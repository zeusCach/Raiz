import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../shared/config/env";
import { User } from "../../features/auth/auth.model";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        nombre: string;
        email: string;
        siguiendo: string[];
        guardados: string[];
        fotoUrl: string;
        bannerUrl: string;
        bio: string;
        formacion: string;
        intereses: string[];
      };
    }
  }
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      res.status(401).json({ message: "No autenticado" });
      return;
    }

    const payload = jwt.verify(token, env.jwtSecret) as { sub: string };
    const user = await User.findById(payload.sub).select('nombre email siguiendo fotoUrl bannerUrl bio formacion intereses');
    if (!user) {
      res.status(401).json({ message: "No autenticado" });
      return;
    }

    req.user = {
      _id: user._id.toString(),
      nombre: user.nombre,
      email: user.email,
      siguiendo: user.siguiendo.map((id) => id.toString()),
      guardados: user.guardados.map((id) => id.toString()),
      fotoUrl: user.fotoUrl,
      bannerUrl: user.bannerUrl,
      bio: user.bio,
      formacion: user.formacion,
      intereses: user.intereses,
    };

    next();
  } catch {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
}
