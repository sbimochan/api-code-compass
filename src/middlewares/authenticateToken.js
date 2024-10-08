import jwt from 'jsonwebtoken';
import Boom from '@hapi/boom';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

/**
 * Middleware to authenticate requests using JWT.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export function authenticateToken(req, res, next) {
  // Get the token from the Authorization header (Bearer Token)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(Boom.unauthorized('Token not provided'));
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return next(Boom.unauthorized('Invalid or expired token'));
    }
    req.user = user;
    next();
  });
}
