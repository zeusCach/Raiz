
import type { Request, Response, NextFunction } from 'express';

import * as postCulturaService from './postCultura.service';

// Obtiene todos los posts, opcionalmente filtrados por tipo.
export async function getPosts(req: Request, res: Response, next: NextFunction) {
  try {

    //obtenemos el tipo de publicación enviado en la consulta
    const tipo = typeof req.query.tipo === 'string' ? req.query.tipo : undefined;

    //obtenemos el id del autor enviado en la consulta
    const autor = typeof req.query.autor === 'string' ? req.query.autor : undefined;

    //buscamos las publicaciones aplicando los filtros recibidos
    const posts = await postCulturaService.getPosts(tipo, autor);

    //enviamos las publicaciones encontradas
    res.json(posts);

  } catch (error) {

    //enviamos el error al manejador de errores
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

    const autor = {
      _id: req.user!._id,
      nombre: req.user!.nombre
    };
    
    // Obtiene los datos enviados en el body de la petición.
    const post = await postCulturaService.createPost({...req.body, autor});

    // Devuelve el post creado con código HTTP 201.
    res.status(201).json(post);
  } catch (error) {
    // Envía el error al middleware global de errores.
    next(error);
  }
}
