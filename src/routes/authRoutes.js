import { Router } from 'express';

import * as authController from '../controllers/auth';
import { loginValidator } from '../validators/authValidator';

const router = Router();

/**
 * POST /api/login
 */
router.post('/login', loginValidator, authController.login);

export default router;
