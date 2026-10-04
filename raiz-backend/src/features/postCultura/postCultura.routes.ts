import { Router } from 'express';
import * as postCulturaController from './postCultura.controller';
import { validate } from '../../shared/middlewares/validate';
import { crearPostSchema, editarPostSchema } from './postCultura.schema';
import { requireAuth } from '../auth/auth.middleware';

const router = Router();

router.get('/', postCulturaController.getPosts);
router.get('/:id', postCulturaController.getPostById);
router.post('/', requireAuth, validate(crearPostSchema), postCulturaController.createPost);
router.patch('/:id', requireAuth, validate(editarPostSchema), postCulturaController.updatePost);
router.delete('/:id', requireAuth, postCulturaController.deletePost);

export default router;