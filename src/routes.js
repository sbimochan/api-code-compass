import { Router } from 'express';

import userRoutes from './routes/userRoutes';
import roleRoutes from './routes/roleRoutes';
import authRoutes from './routes/authRoutes';
import movieRoutes from './routes/movieRoutes';
import rentalRoutes from './routes/rentalRoutes';

import swaggerSpec from '@utils/swagger';

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

router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/movies', movieRoutes);
router.use('/rents', rentalRoutes);

export default router;
