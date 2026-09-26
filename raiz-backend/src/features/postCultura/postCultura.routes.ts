
import { Router } from 'express';
import * as postCulturaController from './postCultura.controller';
import { requireAuth } from '../auth/auth.middleware';

const router = Router();

router.get('/', postCulturaController.getPosts);
router.get('/:id', postCulturaController.getPostById);
router.post('/', requireAuth, postCulturaController.createPost);

export default router;