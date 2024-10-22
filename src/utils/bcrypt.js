import { hashSync, compareSync } from 'bcryptjs';

import { SALT } from '@/constants/bcrypt';

/**
 * Hash a password.
 *
 * @param {string} password
 * @returns
 */
export function hashPassword(password) {
  return hashSync(password, SALT);
}

/**
 * Compare a password with a hash.
 *
 * @param {Promise<string>} password
 * @param {Promise<string>} hash
 * @returns {Promise<boolean>}
 */
export function comparePassword(password, hash) {
  return compareSync(password, hash);
}
