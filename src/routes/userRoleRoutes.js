import { Router } from 'express';

import * as userRoleController from '../controllers/userRoleController';
import { userRoleValidator } from '../validators/userRoleValidator';

const router = Router();

/**
 * PUT /api/user/:userId/roles.
 *
 */
router.put('/:userId/roles', userRoleValidator, userRoleController.updateRoles);

/**
 * DELETE /api/user/:userId/roles/:roleId.
 */
router.delete('/:userId/roles/:roleId', userRoleController.removeUserRole);

export default router;
