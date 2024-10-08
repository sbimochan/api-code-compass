import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const ACCESS_TOKEN_EXPIRATION = '15m'; // Access token lasts for 15 minutes
const REFRESH_TOKEN_EXPIRATION = '7d'; // Refresh token lasts for 7 days

/**
 * Generate an access token.
 *
 * @param {Object} payload - The user payload (id, username).
 * @returns {String} - The generated access token.
 */
export function generateAccessToken(payload) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION });
}

/**
 * Generate a refresh token.
 *
 * @param {Object} payload - The user payload (id, username).
 * @returns {String} - The generated refresh token.
 */
export function generateRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
}

/**
 * Refresh access token.
 *
 * @param {String} refreshToken - The refresh token provided by the user.
 * @returns {Promise<String>} - Returns a new access token.
 */
export async function generateRefreshAccessToken(refreshToken) {
  try {
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const newAccessToken = generateAccessToken({ id: payload.id, username: payload.username });
    return newAccessToken;
  } catch (error) {
    throw Boom.unauthorized('Invalid refresh token');
  }
}
