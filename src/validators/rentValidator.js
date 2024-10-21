import Joi from '@hapi/joi';

import validate from '@utils/validate';

// Validation schema
const schema = Joi.object({
  userId: Joi.number().label('User ID').max(90).required(),
  movieId: Joi.number().label('Movie ID').max(90).required(),
  startDate: Joi.date().label('Start Date').required(),
  dueDate: Joi.date().label('Due Date').required(),
  returnedDate: Joi.date().allow(null).label('Returned Date'),
  issuedBy: Joi.number().label('Issuer ID').max(90).required()
});

/**
 * Validate create/update user request.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise}
 */
function validateToCreateRent(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err));
}

export { validateToCreateRent };
