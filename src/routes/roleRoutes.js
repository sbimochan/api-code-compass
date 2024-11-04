import { Router } from 'express';

import * as roleController from '@/controllers/roles.controller';

import { authorize } from '@middlewares/authorize';

import { roleValidator } from '@validators/roleValidator';

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
router.put('/:id', authorize('role.update'), roleValidator, roleController.update);

/**
 * DELETE /api/roles/:id.
 */
router.delete('/:id', authorize('role.delete'), roleController.deleteRole);

export default router;
