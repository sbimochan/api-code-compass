import Boom from '@hapi/boom';

import Role from '../models/role';

/**
 * Get all roles.
 *
 * @returns {Promise}
 */
export function getAllRoles() {
  return Role.fetchAll();
}

/**
 * Get a role.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getRole(id) {
  return new Role({ id })
    .fetch()
    .then((role) => role)
    .catch(Role.NotFoundError, () => {
      throw Boom.notFound('Role not found');
    });
}

/**
 * Create new role.
 *
 * @param   {Object}  role
 * @returns {Promise}
 */
export function createRole(role) {
  return new Role({ name: role.name, description: role.description }).save();
}

/**
 * Update a role.
 *
 * @param   {Number|String}  id
 * @param   {Object}         role
 * @returns {Promise}
 */
export function updateRole(id, role) {
  return new Role({ id }).save({ name: role.name, description: role.description });
}

/**
 * Delete a role.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteRole(id) {
  return new Role({ id }).fetch().then((role) => role.destroy());
}
