import { Router } from 'express';

import * as roleController from '../controllers/roles';
import { findRole, roleValidator } from '../validators/roleValidator';

const router = Router();

/**
 * GET /api/roles
 */
router.get('/', roleController.fetchAll);

/**
 * POST /api/roles
 */
router.post('/', roleValidator, roleController.create);

/**
 * PATCH /api/roles/:id
 */
router.patch('/:id', findRole, roleValidator, roleController.update);

/**
 * DELETE /api/roles/:id
 */
router.delete('/:id', findRole, roleController.deleteRole);

export default router;
