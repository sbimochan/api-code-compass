import Boom from '@hapi/boom';

import { permissions } from '@constants/permission';

/**
 * Authorize middleware.
 *
 * @param {string[] | string} requiredPermissions
 * @returns
 */
export function authorize(requiredPermissions) {
  return (req, _, next) => {
    if (typeof requiredPermissions !== 'string' && !Array.isArray(requiredPermissions)) {
      return next(Boom.badImplementation('Permission must be a string or an array of strings'));
    }

    const { user } = req;

    if (!user) {
      return next(Boom.unauthorized('Unauthorized'));
    }

    const { roles } = user;

    const userPermissions = roles.flatMap((role) => permissions[role.name]);

    const uniquePermissions = new Set(userPermissions);

    const isAuthorized = Array.isArray(requiredPermissions)
      ? requiredPermissions.every((permission) => uniquePermissions.has(permission))
      : uniquePermissions.has(requiredPermissions);

    if (!isAuthorized) {
      return next(Boom.forbidden('You are not authorized to perform this action'));
    }

    next();
  };
}
