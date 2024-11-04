import Joi from '@hapi/joi';

import * as movieService from '@services/movieService';

import validate from '@utils/validate';

const schema = Joi.object({
  name: Joi.string().label('Title').max(90),
  rating: Joi.number().label('Rating').min(1).max(10),
  description: Joi.string().label('Description'),
  releaseDate: Joi.date().label('Release Date')
});

/**
 * Validate create movie request.
 *
 * @param   {Object}   req
 * @param   {Object}   _
 * @param   {Function} next
 */
function movieValidator(req, _, next) {
  const createSchema = schema.fork(Object.keys(schema.describe().keys), (field) => field.required());

  return validate(req.body, createSchema)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate movie existence.
 *
 * @param {Object} req
 * @param {Object} _
 * @param {Function} next
 */
function findMovie(req, _, next) {
  return movieService
    .getMovie(req.params.id)
    .then(() => next())
    .catch((err) => next(err));
}

export { movieValidator, findMovie };
