import Boom from '@hapi/boom';

import Movie from '@models/movie';

import { buildMeta } from '@utils/pagination';

/**
 * Get all movies.
 *
 * @returns {Promise}
 */
export function getAllMovies() {
  const data = Movie.fetchAll();
  const count = Movie.count();

  return Promise.all([data, count]).then(([data, count]) => {
    // TODO: Implement pagination
    const meta = buildMeta({ page: 1, pageSize: data.length }, count);

    return { data, meta };
  });
}

/**
 * Get a movie.
 *
 * @param {number} id
 * @returns {Promise}
 */
export function getMovie(id) {
  return new Movie({ id })
    .fetch()
    .then((movie) => movie)
    .catch(Movie.NotFoundError, () => {
      throw Boom.notFound('Movie not found');
    });
}

/**
 * Create new movie.
 *
 * @param {Object} movie
 * @returns {Promise}
 */
export function createMovie(movie) {
  // TODO: Get the current user id
  const createdBy = 1;
  const updatedBy = 1;

  return new Movie({
    name: movie.name,
    rating: movie.rating,
    description: movie.description,
    releaseDate: movie.releaseDate,
    createdBy,
    updatedBy
  }).save();
}

/**
 * Update a movie.
 *
 * @param {number} id
 * @param {Object} movie
 * @returns {Promise}
 */
export function updateMovie(id, movie) {
  // TODO: Get the current user id
  const updatedBy = 1;

  return new Movie({ id }).save({
    name: movie.name,
    rating: movie.rating,
    description: movie.description,
    releaseDate: movie.releaseDate,
    updatedBy
  });
}

/**
 * Delete a movie.
 *
 * @param {number} id
 * @returns {Promise}
 */
export function deleteMovie(id) {
  return new Movie({ id }).fetch().then((movie) => movie.destroy());
}
