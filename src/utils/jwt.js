import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Generate JWT token for a user.
 * @param {Object} payload - Data to include in the token.
 * @returns {String} - JWT token.
 */
export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

/**
 * Verify and parse the JWT token.
 * @param {String} token - JWT token.
 * @returns {Object} - Decoded payload.
 */
export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
