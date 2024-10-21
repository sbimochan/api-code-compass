import Joi from '@hapi/joi';

import * as userService from '@services/userService';

import validate from '@utils/validate';

// Validation schema
const schema = Joi.object({
  username: Joi.string().label('Username').max(20).required(),
  email: Joi.string().label('Email').max(90).required(),
  password: Joi.string().label('Password').max(100).required(),
  fullName: Joi.string(),
  isAdmin: Joi.bool()
});

/**
 * Validate create/update user request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function userValidator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate users existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findUser(req, res, next) {
  return userService
    .getUser(req.params.id)
    .then(() => next())
    .catch((err) => next(err));
}

export { findUser, userValidator };
