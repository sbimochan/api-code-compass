import { Router } from 'express';

import * as roleController from '../controllers/rolesController';
import { findRole, roleValidator } from '../validators/roleValidator';

const router = Router();

/**
 * GET /api/roles.
 */
router.get('/', roleController.fetchAll);

/**
 * POST /api/roles.
 */
router.post('/', roleValidator, roleController.create);

/**
 * PUT /api/roles/:id.
 */
router.put('/:id', findRole, roleValidator, roleController.update);

/**
 * DELETE /api/roles/:id.
 */
router.delete('/:id', findRole, roleController.deleteRole);

export default router;
