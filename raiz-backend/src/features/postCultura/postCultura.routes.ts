
import { Router } from 'express';
import * as postCulturaController from './postCultura.controller';
import { requireAuth } from '../auth/auth.middleware';
import { validate } from '../../shared/middlewares/validate';
import { crearPostSchema } from './postCultura.schema';

const router = Router();

router.get('/', postCulturaController.getPosts);
router.get('/:id', postCulturaController.getPostById);
router.post('/', requireAuth, validate(crearPostSchema), postCulturaController.createPost);

export default router;