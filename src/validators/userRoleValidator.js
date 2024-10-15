import Joi from '@hapi/joi';

import validate from '../utils/validate';

// Validation schema
const schema = Joi.object({
  roles: Joi.array().label('Roles').required()
});

/**
 * Validate update user role request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function userRoleValidator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err));
}

export { userRoleValidator };
