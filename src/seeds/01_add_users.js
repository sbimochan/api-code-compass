const TABLE_NAME = 'users';

import { hashSync } from 'bcryptjs';

/**
 * Delete existing entries and seed values for users.
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

  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          id: 1,
          username: 'admin',
          full_name: 'Administrator',
          email: 'admin@example.com',
          password: hashSync('admin', 8),
          is_admin: true
        },
        {
          id: 2,
          username: 'user',
          full_name: 'Regular User',
          email: 'user@example.com',
          password: hashSync('user', 8)
        }
      ]);
    });
}
