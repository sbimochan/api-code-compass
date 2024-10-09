import { Router } from 'express';

import * as userRoleController from '../controllers/userRole';
import { userRoleValidator } from '../validators/userRoleValidator';

const router = Router();

/**
 * PATCH /api/user/:userId/roles
 *
 */
router.patch('/:userId/roles', userRoleValidator, userRoleController.updateRoles);

/**
 * DELETE /api/user/:userId/roles/:roleId
 */
router.delete('/:userId/roles/:roleId', userRoleController.removeUserRole);

export default router;
