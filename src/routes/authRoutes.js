import { Router } from 'express';

import * as authController from '@controllers/authController';

import { rateLimiter } from '@middlewares/rateLimiter';
import { authenticateToken } from '@middlewares/authenticateToken';

import { loginValidator, refreshTokenValidator } from '@validators/authValidator';

const router = Router();

/**
 * POST /api/login.
 */
router.post('/login', rateLimiter, loginValidator, authController.login);

/**
 * POST /api/token/refresh.
 */
router.post('/token/refresh', rateLimiter, refreshTokenValidator, authController.refreshAccessToken);

/**
 * Example
 * GET /api/protected.
 */
router.get('/protected', rateLimiter, authenticateToken, (req, res) => {
  res.json({
    message: 'You have access to the protected resource!',
    user: req.user
  });
});

export default router;
