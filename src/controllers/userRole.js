import HttpStatus from 'http-status-codes';

import * as userRoleService from '../services/userRoleService';

/**
 * Update user roles
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function updateRoles(req, res, next) {
  userRoleService
    .updateRoles(req.params.userId, req.body)
    .then((data) => res.status(HttpStatus.OK).json({ data }))
    .catch((err) => next(err));
}

/**
 * Delete user role with roleId
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function removeUserRole(req, res, next) {
  userRoleService
    .removeUserRole(req.params.userId, req.params.roleId)
    .then((data) => res.status(HttpStatus.OK).json({ data }))
    .catch((err) => next(err));
}
