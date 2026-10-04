import type { Request, Response, NextFunction } from "express";

import * as postCulturaService from "./postCultura.service";
import { Comunidad } from "../comunidad/comunidad.model";

// Obtiene todos los posts, opcionalmente filtrados por tipo.
export async function getPosts(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    //obtenemos el tipo de publicación enviado en la consulta
    const tipo =
      typeof req.query.tipo === "string" ? req.query.tipo : undefined;

    //obtenemos el id del autor enviado en la consulta
    const autor =
      typeof req.query.autor === "string" ? req.query.autor : undefined;

    //obtenemos el id de la comunidad enviado en la consulta
    const comunidad =
      typeof req.query.comunidad === "string" ? req.query.comunidad : undefined;

    //buscamos las publicaciones aplicando los filtros recibidos
    const posts = await postCulturaService.getPosts(tipo, autor, comunidad);

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
  next: NextFunction,
) {
  try {
    // Obtiene el ID enviado en la URL (/posts/:id).
    const postId =
      typeof req.params.id === "string" ? req.params.id : undefined;

    if (!postId) {
      res.status(400).json({ message: "ID de post inválido" });
      return;
    }

    const post = await postCulturaService.getPostById(postId);

    // Si no existe el post, devuelve 404.
    if (!post) {
      res.status(404).json({ message: "Post no encontrado" });
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
export async function createPost(req: Request, res: Response, next: NextFunction) {
  try {
    //obtenemos el id de la comunidad donde se quiere publicar
    const { comunidadId } = req.body;

    //si la publicación pertenece a una comunidad verificamos que exista y que el usuario sea miembro
    if (comunidadId) {

      //buscamos la comunidad por su id
      const comunidad = await Comunidad.findById(comunidadId);

      //si no existe la comunidad se rechaza la publicación
      if (!comunidad) {
        res.status(404).json({ message: 'Comunidad no encontrada' });
        return;
      }

      //verificamos que el usuario actual pertenezca a la comunidad
      const esMiembro = comunidad.miembros.some((m) => m.toString() === req.user!._id);

      //si el usuario no es miembro se rechaza la publicación
      if (!esMiembro) {
        res.status(403).json({ message: 'Debes unirte a la comunidad para publicar aquí' });
        return;
      }
    }

    //creamos los datos del autor usando la información del usuario actual
    const autor = {
      _id: req.user!._id,
      nombre: req.user!.nombre,
      avatarUrl: req.user!.fotoUrl || undefined,
    };

    //creamos la publicación agregando los datos del autor
    const post = await postCulturaService.createPost({ ...req.body, autor });

    //enviamos la publicación creada
    res.status(201).json(post);
  } catch (error) {
    //enviamos el error al manejador de errores
    next(error);
  }
}

// Actualiza una publicación existente.
export async function updatePost(req: Request, res: Response, next: NextFunction) {
  try {
    // Verifica si el usuario tiene permiso para modificar la publicación.
    const puede = await postCulturaService.puedeModificar(String(req.params.id), req.user!._id);

    // Si no tiene permiso, devuelve un error 403.
    if (!puede) {
      res.status(403).json({ message: 'No tienes permiso para editar esta publicación' });
      return;
    }

    // Actualiza la publicación con los datos recibidos en el cuerpo de la solicitud.
    const post = await postCulturaService.actualizarPost(String(req.params.id), req.body);

    // Si la publicación no existe, devuelve un error 404.
    if (!post) {
      res.status(404).json({ message: 'Publicación no encontrada' });
      return;
    }

    // Devuelve la publicación actualizada.
    res.json(post);
  } catch (error) {
    // Envía el error al middleware de manejo de errores.
    next(error);
  }
}

// Elimina una publicación existente.
export async function deletePost(req: Request, res: Response, next: NextFunction) {
  try {
    // Verifica si el usuario tiene permiso para eliminar la publicación.
    const puede = await postCulturaService.puedeModificar(String(req.params.id), req.user!._id);

    // Si no tiene permiso, devuelve un error 403.
    if (!puede) {
      res.status(403).json({ message: 'No tienes permiso para borrar esta publicación' });
      return;
    }

    // Elimina la publicación mediante el servicio.
    const post = await postCulturaService.eliminarPost(String(req.params.id));

    // Si la publicación no existe, devuelve un error 404.
    if (!post) {
      res.status(404).json({ message: 'Publicación no encontrada' });
      return;
    }

    // Confirma la eliminación con el código 204, sin devolver contenido.
    res.status(204).send();
  } catch (error) {
    // Envía el error al middleware de manejo de errores.
    next(error);
  }
}