import HttpStatus from 'http-status-codes';

import * as movieService from '@/services/movie.service';

import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '@/constants/constant';

/**
 * Get all movies.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req, res, next) {
  const { page = DEFAULT_PAGE_NUMBER, pageSize = DEFAULT_PAGE_SIZE } = req.query;

  movieService
    .getAllMovies({ page: Number(page), pageSize: Number(pageSize) })
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

/**
 * Get a movie by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchById(req, res, next) {
  movieService
    .getMovie(req.params.id)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Create a new movie.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function create(req, res, next) {
  movieService
    .createMovie(req.body)
    .then((data) => res.status(HttpStatus.CREATED).json({ data }))
    .catch((err) => next(err));
}

/**
 * Update a movie.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function update(req, res, next) {
  movieService
    .updateMovie(req.params.id, req.body)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Delete a movie.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function remove(req, res, next) {
  movieService
    .deleteMovie(req.params.id)
    .then(() => res.status(HttpStatus.NO_CONTENT).end())
    .catch((err) => next(err));
}
