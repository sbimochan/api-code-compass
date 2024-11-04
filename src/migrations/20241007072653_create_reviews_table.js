const TABLE_NAME = 'reviews';

/**
 * Create table reviews.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments();
    table.integer('user_id').references('id').inTable('users');
    table.float('rating').notNull();
    table.text('comment');
    table.integer('movie_id').references('id').inTable('movies');
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull().defaultTo(knex.raw('now()'));
  });
}

/**
 * Drop reviews.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable(TABLE_NAME, (table) => {
    table.dropForeign('user_id');
    table.dropForeign('movie_id');
  });
}
