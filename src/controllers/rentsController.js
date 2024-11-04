import HttpStatus from 'http-status-codes';

import * as rentService from '@services/rentService';

/**
 * Create a new user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function create(req, res, next) {
  rentService
    .createRent(req.user.id, req.body)
    .then((data) => res.status(HttpStatus.CREATED).json({ data }))
    .catch((err) => next(err));
}

/**
 * Fetch rent by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchById(req, res, next) {
  rentService
    .getRent(req.params.id)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}
