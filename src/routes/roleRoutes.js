import { Router } from 'express';

import * as roleController from '@controllers/rolesController';

import { authorize } from '@middlewares/authorize';

import { findRole, roleValidator } from '@validators/roleValidator';

const router = Router();

/**
 * GET /api/roles.
 */
router.get('/', authorize('role.read'), roleController.fetchAll);

/**
 * POST /api/roles.
 */
router.post('/', authorize('role.create'), roleValidator, roleController.create);

/**
 * PUT /api/roles/:id.
 */
router.put('/:id', authorize('role.update'), findRole, roleValidator, roleController.update);

/**
 * DELETE /api/roles/:id.
 */
router.delete('/:id', authorize('role.delete'), findRole, roleController.deleteRole);

export default router;
