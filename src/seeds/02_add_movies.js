import { faker } from '@faker-js/faker';

const TABLE_NAME = 'movies';

/**
 * Delete existing entries and seed values for `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export async function seed(knex) {
  const { count } = await knex(TABLE_NAME).count('*').first();

  // Prevent data from being cleared if it already exists.
  if (+count) {
    return;
  }

  const movies = Array.from({ length: 20 }, () => ({
    name: faker.lorem.words(),
    rating: faker.number.float({ min: 1, max: 10 }),
    description: faker.lorem.paragraph(),
    release_date: faker.date.recent(),
    created_by: 1,
    updated_by: 1
  }));

  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert(movies);
    });
}
