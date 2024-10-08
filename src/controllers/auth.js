import HttpStatus from 'http-status-codes';

import * as authService from '../services/authService';

/**
 * User login
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function login(req, res, next) {
  authService
    .login(req.body)
    .then((data) => res.status(HttpStatus.OK).json({ data }))
    .catch((err) => next(err));
}
