import type { Request, Response, NextFunction } from 'express';
import * as comunidadService from './comunidad.service';

export async function crear(req: Request, res: Response, next: NextFunction) {
  try {
    //obtenemos los datos de la comunidad enviados por el usuario
    const { nombre, descripcion } = req.body;

    //creamos la comunidad usando al usuario que tiene la sesión activa como creador
    const comunidad = await comunidadService.crearComunidad(req.user!._id, nombre, descripcion);

    //enviamos la comunidad creada
    res.status(201).json(comunidad);
  } catch (error) {
    //enviamos el error al manejador de errores
    next(error);
  }
}

export async function listar(req: Request, res: Response, next: NextFunction) {
  try {
    //buscamos todas las comunidades disponibles
    const comunidades = await comunidadService.listarComunidades();

    //enviamos las comunidades encontradas
    res.json(comunidades);
  } catch (error) {
    //enviamos el error al manejador de errores
    next(error);
  }
}

export async function obtener(req: Request, res: Response, next: NextFunction) {
  try {
    //buscamos la comunidad indicada por su id
    const comunidad = await comunidadService.obtenerComunidad(String(req.params.id));

    //enviamos la comunidad encontrada
    res.json(comunidad);
  } catch (error) {
    //si la comunidad no existe se devuelve un error 404
    if (error instanceof Error && error.message.includes('no encontrada')) {
      res.status(404).json({ message: error.message });
      return;
    }

    //enviamos cualquier otro error al manejador de errores
    next(error);
  }
}

export async function unirse(req: Request, res: Response, next: NextFunction) {
  try {
    //agregamos al usuario actual como miembro de la comunidad
    const comunidad = await comunidadService.unirseComunidad(String(req.params.id), req.user!._id);

    //enviamos la comunidad actualizada
    res.json(comunidad);
  } catch (error) {
    //enviamos el error al manejador de errores
    next(error);
  }
}

export async function salir(req: Request, res: Response, next: NextFunction) {
  try {
    //eliminamos al usuario actual de los miembros de la comunidad
    const comunidad = await comunidadService.salirComunidad(String(req.params.id), req.user!._id);

    //enviamos la comunidad actualizada
    res.json(comunidad);
  } catch (error) {
    //enviamos el error al manejador de errores
    next(error);
  }
}

export async function actualizarBanner(req: Request, res: Response, next: NextFunction) {
  try {

    //obtenemos la url del banner enviada por el usuario
    const { bannerUrl } = req.body;

    //actualizamos el banner de la comunidad verificando que el usuario sea el creador
    const comunidad = await comunidadService.actualizarBanner(String(req.params.id), req.user!._id, bannerUrl);

    //enviamos la comunidad actualizada
    res.json(comunidad);

  } catch (error) {

    //si el usuario no es el creador o la comunidad no existe se devuelve un error 403
    if (
      error instanceof Error &&
      (error.message.includes('Solo el creador') || error.message.includes('no encontrada'))
    ) {
      res.status(403).json({ message: error.message });
      return;
    }

    //enviamos cualquier otro error al manejador de errores
    next(error);
  }
}