import Boom from '@hapi/boom';
import bcrypt from 'bcryptjs';

import User from '../models/user';
import { generateAccessToken, generateRefreshToken, generateRefreshAccessToken } from '../utils/jwt';

/**
 * Login user by validating username and password.
 *
 * @param {String} username
 * @param {String} password
 * @returns {Promise<Object>} - Returns the user object, access token, and refresh token.
 */
export async function login({ username, password }) {
  const user = await new User().where({ username }).fetch({ require: false });

  if (!user || !(await bcrypt.compare(password, user.get('password')))) {
    throw Boom.unauthorized('Invalid username or password');
  }

  // Generate Access Token and Refresh Token
  const accessToken = generateAccessToken({ id: user.get('id'), username: user.get('username') });
  const refreshToken = generateRefreshToken({ id: user.get('id'), username: user.get('username') });

  return {
    user: user.pick(['id', 'username']),
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
  return { accessToken: token };
}
