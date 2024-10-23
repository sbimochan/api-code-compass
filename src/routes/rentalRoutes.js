import { Router } from 'express';

import * as rentsController from '@controllers/rentsController';

import { authorize } from '@middlewares/authorize';

import { validateToCreateRent } from '@validators/rentValidator';

const router = Router();

/**
 * POST /api/rents.
 */
router.post('/', authorize('rental.create'), validateToCreateRent, rentsController.create);

/**
 * GET /api/rents/:id.
 */
router.get('/:id', authorize('rental.read'), rentsController.fetchById);

// Lets not create fetchAll and other routes until necessary

export default router;
