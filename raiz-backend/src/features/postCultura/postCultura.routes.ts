
import { Router } from 'express';
import * as postCulturaController from './postCultura.controller';

const router = Router();

router.get('/', postCulturaController.getPosts);
router.get('/:id', postCulturaController.getPostById);
router.post('/', postCulturaController.createPost);

export default router;