import { Router } from 'express';

import * as moviesController from '@controllers/moviesController';

import { authorize } from '@middlewares/authorize';

import { movieValidator, findMovie } from '@validators/movieValidator';

const router = Router();

/**
 * GET /api/movies.
 */
router.get('/', authorize('movie.read'), moviesController.fetchAll);

/**
 * GET /api/movies/:id.
 */
router.get('/:id', authorize('movie.read'), moviesController.fetchById);

/**
 * POST /api/movies.
 */
router.post('/', authorize('movie.create'), movieValidator, moviesController.create);

/**
 * PUT /api/movies/:id.
 */
router.put('/:id', authorize('movie.update'), findMovie, movieValidator, moviesController.update);

/**
 * DELETE /api/movies/:id.
 */
router.delete('/:id', authorize('movie.delete'), findMovie, moviesController.remove);

export default router;
