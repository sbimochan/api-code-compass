import { Router } from 'express';

import swaggerSpec from './utils/swagger';
import userRoutes from './routes/userRoutes';
import roleRoutes from './routes/roleRoutes';
import authRoutes from './routes/authRoutes';
import movieRoutes from './routes/movieRoutes';
import rentalRoutes from './routes/rentalRoutes';

/**
 * Contains all API routes for the application.
 */
const router = Router();

/**
 * GET /api/swagger.json.
 */
router.get('/swagger.json', (req, res) => {
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

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/rents', rentalRoutes);
router.use('/roles', roleRoutes);
router.use('/', authRoutes);

export default router;
