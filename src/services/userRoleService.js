import Boom from '@hapi/boom';

import Role from '../models/role';
import User from '../models/user';

/**
 * Update roles for a user.
 *
 * @param {Number} userId - The ID of the user to update.
 * @param {Array} roles - Array of role IDs to assign to the user.
 * @returns {Promise<Object>} - Returns the user object after updating roles.
 */
export async function updateRoles(userId, { roles }) {
  const user = await new User({ id: userId }).fetch({ require: false });
  if (!user) {
    throw Boom.notFound('User not found');
  }

  // Validate roles: Check if the role IDs exist in the roles table
  const validRoles = await new Role().where('id', 'in', roles).fetchAll();
  if (validRoles.length !== roles.length) {
    throw Boom.badRequest('Some roles are invalid.');
  }

  await user.roles().detach();
  await user.roles().attach(roles);

  // Return updated user with new roles
  return user.refresh({ withRelated: ['roles'] });
}

/**
 * Remove a specific role from a user.
 *
 * @param {Number} userId - The ID of the user.
 * @param {Number} roleId - The ID of the role to remove.
 * @returns {Promise<Object>} - Success message after removing the role.
 */
export async function removeUserRole(userId, roleId) {
  const user = await new User({ id: userId }).fetch({ require: false });
  if (!user) {
    throw Boom.notFound('User not found');
  }

  const role = await new Role({ id: roleId }).fetch({ require: false });
  if (!role) {
    throw Boom.notFound('Role not found');
  }

  await user.roles().detach(roleId);

  return { message: 'Role removed successfully' };
}
