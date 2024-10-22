import { Router } from 'express';

import userRoleRoutes from './userRoleRoutes';

import * as usersController from '@controllers/usersController';

import { findUser, userValidator } from '@validators/userValidator';

const router = Router();

/**
 * GET /api/users.
 */
router.get('/', usersController.fetchAll);

/**
 * GET /api/users/:id.
 */
router.get('/:id', usersController.fetchById);

/**
 * POST /api/users.
 */
router.post('/', userValidator, usersController.create);

/**
 * PUT /api/users/:id.
 */
router.put('/:id', findUser, userValidator, usersController.update);

/**
 * DELETE /api/users/:id.
 */
router.delete('/:id', findUser, usersController.deleteUser);

/**
 * Routes for user roles.
 */
router.use('/', userRoleRoutes);

export default router;
