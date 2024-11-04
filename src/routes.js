import { Router } from 'express';

import userRoutes from './routes/userRoutes';
import roleRoutes from './routes/roleRoutes';
import authRoutes from './routes/authRoutes';
import movieRoutes from './routes/movieRoutes';
import rentalRoutes from './routes/rentalRoutes';

import swaggerSpec from '@utils/swagger';

import { authenticateToken } from '@middlewares/authenticateToken';

/**
 * Contains all API routes for the application.
 */
const router = Router();

/**
 * GET /api/swagger.json.
 */
router.get('/swagger.json', (_, res) => {
  res.json(swaggerSpec);
});

/**
 * GET /api.
 */
router.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version
  });
});

router.use('/auth', authRoutes);

router.use('/users', authenticateToken, userRoutes);
router.use('/roles', authenticateToken, roleRoutes);
router.use('/movies', authenticateToken, movieRoutes);
router.use('/rents', authenticateToken, rentalRoutes);

export default router;
