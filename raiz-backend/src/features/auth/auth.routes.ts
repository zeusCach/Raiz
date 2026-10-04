import { Router } from "express";
import * as authController from './auth.controller';
import { requireAuth } from "./auth.middleware";
import { validate } from "../../shared/middlewares/validate";
import { actualizarPerfilSchema, loginSchema, registroSchema } from "./auth.schema";
// import { requireAuth } from "./auth.middleware";

const authRouter = Router();


authRouter.post('/registro',validate(registroSchema), authController.registro);
authRouter.post('/login', validate(loginSchema), authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/me', requireAuth, authController.me);
authRouter.patch('/me', requireAuth, validate(actualizarPerfilSchema), authController.actualizarMiPerfil);
authRouter.get('/sugeridos', requireAuth, authController.sugeridos);
authRouter.get('/guardados', requireAuth, authController.guardados);
authRouter.post('/posts/:postId/guardar', requireAuth, authController.guardarPost);
authRouter.post('/posts/:postId/quitar-guardado', requireAuth, authController.quitarGuardado);
authRouter.get('/buscar', authController.buscar);
authRouter.get('/:id/perfil', authController.perfil);
authRouter.post('/:id/seguir', requireAuth, authController.seguir);
authRouter.post('/:id/dejar-de-seguir', requireAuth, authController.dejarDeSeguir);


export default authRouter;