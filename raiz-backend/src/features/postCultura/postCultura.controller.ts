
import type { Request, Response, NextFunction } from 'express';

import * as postCulturaService from './postCultura.service';

// Obtiene todos los posts, opcionalmente filtrados por tipo.
export async function getPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Obtiene el tipo de post enviado mediante query (?tipo=foro).
    const tipo =
      typeof req.query.tipo === 'string'
        ? req.query.tipo
        : undefined;

    // Solicita los posts al servicio.
    const posts = await postCulturaService.getPosts(tipo);

    // Devuelve los posts al cliente.
    res.json(posts);
  } catch (error) {
    // Envía el error al middleware global de errores.
    next(error);
  }
}

// Obtiene un post específico mediante su ID.
export async function getPostById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Obtiene el ID enviado en la URL (/posts/:id).
    const postId = typeof req.params.id === 'string' ? req.params.id : undefined;

    if (!postId) {
      res.status(400).json({ message: 'ID de post inválido' });
      return;
    }

    const post = await postCulturaService.getPostById(postId);

    // Si no existe el post, devuelve 404.
    if (!post) {
      res.status(404).json({ message: 'Post no encontrado' });
      return;
    }

    // Devuelve el post encontrado.
    res.json(post);
  } catch (error) {
    // Envía el error al middleware global de errores.
    next(error);
  }
}

// Crea un nuevo post utilizando los datos enviados por el cliente.
export async function createPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Obtiene los datos enviados en el body de la petición.
    const post = await postCulturaService.createPost(req.body);

    // Devuelve el post creado con código HTTP 201.
    res.status(201).json(post);
  } catch (error) {
    // Envía el error al middleware global de errores.
    next(error);
  }
}
