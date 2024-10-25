import Boom from '@hapi/boom';

import Rent from '@models/rent';

/**
 * Create new rent.
 *
 * @param {number} issuedBy
 * @param {Object} rent
 * @returns {Promise}
 */
export function createRent(issuedBy, rent) {
  return new Rent({
    movieId: rent.movieId,
    userId: rent.userId,
    startDate: rent.startDate,
    dueDate: rent.dueDate,
    returnedDate: rent.returnedDate,
    issuedBy
  }).save();
}

/**
 * Get a rent.
 *
 * @param {number} id
 * @returns {Promise}
 */
export function getRent(id) {
  return new Rent({ id })
    .fetch()
    .then((rent) => rent)
    .catch(Rent.NotFoundError, () => {
      throw Boom.notFound('Rental not found');
    });
}
