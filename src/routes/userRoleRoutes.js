import { Router } from 'express';

import * as userRoleController from '@controllers/userRoleController';

import { authorize } from '@middlewares/authorize';

import { userRoleValidator } from '@validators/userRoleValidator';

const router = Router();

/**
 * PUT /api/user/:userId/roles.
 *
 */
router.put('/:userId/roles', authorize('role.update'), userRoleValidator, userRoleController.updateRoles);

/**
 * DELETE /api/user/:userId/roles/:roleId.
 */
router.delete('/:userId/roles/:roleId', authorize('role.delete'), userRoleController.removeUserRole);

export default router;
