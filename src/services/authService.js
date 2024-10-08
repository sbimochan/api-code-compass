import Boom from '@hapi/boom';
import bcrypt from 'bcryptjs';

import User from '../models/user';
import { generateToken } from '../utils/jwt';

/**
 * Login user by validating username and password.
 *
 * @param {String} username
 * @param {String} password
 * @returns {Promise<Object>} - Returns the user object and JWT token.
 */
export async function login({ username, password }) {
  const user = await new User().where({ username }).fetch({ require: false });
  if (!user) {
    throw Boom.notFound('Username invalid');
  }

  const isPasswordValid = await bcrypt.compare(password, user.get('password'));
  if (!isPasswordValid) {
    throw Boom.unauthorized('Invalid username or password');
  }

  // Generate JWT token after successful login
  const token = generateToken({ id: user.get('id'), username: user.get('username') });

  return { user: user.pick(['id', 'username']), token };
}
