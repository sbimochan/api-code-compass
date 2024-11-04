import Boom from '@hapi/boom';

import User from '@/models/user.model';

import { comparePassword } from '@/utils/bcrypt';
import { generateAccessToken, generateRefreshToken, generateRefreshAccessToken } from '@utils/jwt';

/**
 * Login user by validating username and password.
 *
 * @param {Object} credentials - The login credentials.
 * @param {string} credentials.username - The username of the user.
 * @param {string} credentials.password - The password of the user.
 * @returns {Promise<Object>} A promise that resolves to the login result,
 * including user information and authentication token.
 */
export async function login({ username, password }) {
  const user = await new User().where({ username }).fetch({ require: false });

  if (!user || !comparePassword(password, user.get('password'))) {
    throw Boom.unauthorized('Invalid username or password');
  }

  // Generate Access Token and Refresh Token
  const accessToken = generateAccessToken({ id: user.get('id'), username: user.get('username') });
  const refreshToken = generateRefreshToken({ id: user.get('id'), username: user.get('username') });

  return {
    accessToken,
    refreshToken
  };
}

/**
 * Refresh the access token using a refresh token.
 *
 * @param {String} refreshToken - The refresh token from the request.
 * @returns {Promise<Object>} - Returns the new access token.
 */
export async function refreshAccessToken({ refreshToken }) {
  const token = await generateRefreshAccessToken(refreshToken);

  return { accessToken: token, refreshToken };
}
