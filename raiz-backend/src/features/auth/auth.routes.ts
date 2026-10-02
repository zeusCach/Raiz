import { Router } from "express";
import * as authController from './auth.controller';
import { requireAuth } from "./auth.middleware";
// import { requireAuth } from "./auth.middleware";

const authRouter = Router();


authRouter.post('/registro', authController.registro);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/me', requireAuth, authController.me);
authRouter.patch('/me', requireAuth, authController.actualizarMiPerfil);
authRouter.get('/sugeridos', requireAuth, authController.sugeridos);
authRouter.get('/guardados', requireAuth, authController.guardados);
authRouter.post('/posts/:postId/guardar', requireAuth, authController.guardarPost);
authRouter.post('/posts/:postId/quitar-guardado', requireAuth, authController.quitarGuardado);
authRouter.get('/:id/perfil', authController.perfil);
authRouter.post('/:id/seguir', requireAuth, authController.seguir);
authRouter.post('/:id/dejar-de-seguir', requireAuth, authController.dejarDeSeguir);


export default authRouter;