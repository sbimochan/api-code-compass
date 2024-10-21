import { Router } from 'express';

import * as rentsController from '@controllers/rentsController';

import { validateToCreateRent } from '@validators/rentValidator';

const router = Router();

/**
 * POST /api/rents.
 */
router.post('/', validateToCreateRent, rentsController.create);

/**
 * GET /api/rents/:id.
 */
router.get('/:id', rentsController.fetchById);

// Lets not create fetchAll and other routes until necessary

export default router;
