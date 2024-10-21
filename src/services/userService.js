import Boom from '@hapi/boom';

import { hashPassword } from '@/utils/bcrypt';

import User from '@models/user';

/**
 * Get all users.
 *
 * @returns {Promise}
 */
export function getAllUsers() {
  return User.fetchAll().then((users) => users.map((user) => user.filterSensitiveData()));
}

/**
 * Get a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getUser(id) {
  return new User({ id })
    .fetch()
    .then((user) => user.filterSensitiveData())
    .catch(User.NotFoundError, () => {
      throw Boom.notFound('User not found');
    });
}

/**
 * Create new user.
 *
 * @param   {Object}  user
 * @returns {Promise}
 */
export function createUser(user) {
  const hashedPassword = hashPassword(user.password);

  return new User({
    username: user.username,
    fullName: user.fullName,
    password: hashedPassword,
    email: user.email
  })
    .save()
    .then((user) => user.filterSensitiveData());
}

/**
 * Update a user.
 *
 * @param   {Number|String}  id
 * @param   {Object}         user
 * @returns {Promise}
 */
export function updateUser(id, user) {
  return new User({ id })
    .save({
      username: user.username,
      fullName: user.fullName,
      password: user.password,
      email: user.email,
      isAdmin: user.isAdmin
    })
    .then((user) => user.filterSensitiveData());
}

/**
 * Delete a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteUser(id) {
  return new User({ id }).fetch().then((user) => user.destroy());
}
