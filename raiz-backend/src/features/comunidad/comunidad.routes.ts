import { Router } from 'express';
import * as comunidadController from './comunidad.controller';
import { requireAuth } from '../auth/auth.middleware';
import { actualizarBannerSchema, crearComunidadSchema } from './comunidad.schema';
import { validate } from '../../shared/middlewares/validate';

const comunidadRoutes = Router();

comunidadRoutes.get('/', comunidadController.listar);
comunidadRoutes.get('/:id', comunidadController.obtener);
comunidadRoutes.post('/', requireAuth, validate(crearComunidadSchema), comunidadController.crear);
comunidadRoutes.post('/:id/unirse', requireAuth, comunidadController.unirse);
comunidadRoutes.post('/:id/salir', requireAuth, comunidadController.salir);
comunidadRoutes.patch('/:id/banner', requireAuth, validate(actualizarBannerSchema), comunidadController.actualizarBanner);

export default comunidadRoutes;