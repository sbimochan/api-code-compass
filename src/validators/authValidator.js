import Joi from '@hapi/joi';

import validate from '../utils/validate';

// Validation schema
const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

/**
 * Validate login request
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function loginValidator(req, res, next) {
  return validate(req.body, loginSchema)
    .then(() => next())
    .catch((err) => next(err));
}

export { loginValidator };
