import { Router } from 'express';
import * as comunidadController from './comunidad.controller';
import { requireAuth } from '../auth/auth.middleware';

const comunidadRoutes = Router();

comunidadRoutes.get('/', comunidadController.listar);
comunidadRoutes.get('/:id', comunidadController.obtener);
comunidadRoutes.post('/', requireAuth, comunidadController.crear);
comunidadRoutes.post('/:id/unirse', requireAuth, comunidadController.unirse);
comunidadRoutes.post('/:id/salir', requireAuth, comunidadController.salir);

export default comunidadRoutes;