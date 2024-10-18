import { Router } from 'express';

import * as moviesController from '../controllers/moviesController';
import { movieValidator, findMovie } from '../validators/movieValidator';

const router = Router();

/**
 * GET /api/movies.
 */
router.get('/', moviesController.fetchAll);

/**
 * GET /api/movies/:id.
 */
router.get('/:id', moviesController.fetchById);

/**
 * POST /api/movies.
 */
router.post('/', movieValidator, moviesController.create);

/**
 * PUT /api/movies/:id.
 */
router.put('/:id', findMovie, movieValidator, moviesController.update);

/**
 * DELETE /api/movies/:id.
 */
router.delete('/:id', findMovie, moviesController.remove);

export default router;
