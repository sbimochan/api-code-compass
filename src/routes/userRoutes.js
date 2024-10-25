import { Router } from 'express';

import userRoleRoutes from './userRoleRoutes';

import * as usersController from '@controllers/usersController';

import { authorize } from '@middlewares/authorize';

import { findUser, userValidator } from '@validators/userValidator';

const router = Router();

/**
 * GET /api/users.
 */
router.get('/', authorize('user.read'), usersController.fetchAll);

/**
 * GET /api/users/:id.
 */
router.get('/:id', authorize('user.read'), usersController.fetchById);

/**
 * POST /api/users.
 */
router.post('/', authorize('user.create'), userValidator, usersController.create);

/**
 * PUT /api/users/:id.
 */
router.put('/:id', authorize('user.update'), findUser, userValidator, usersController.update);

/**
 * DELETE /api/users/:id.
 */
router.delete('/:id', authorize('user.delete'), findUser, usersController.deleteUser);

/**
 * Routes for user roles.
 */
router.use('/', userRoleRoutes);

export default router;
