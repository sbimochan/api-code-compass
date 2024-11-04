const TABLE_NAME = 'rents';

/**
 * Create table rents.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments();
    table.integer('movie_id').references('id').inTable('movies');
    table.integer('user_id').references('id').inTable('users');
    table.timestamp('start_date').notNull();
    table.timestamp('due_date').notNull();
    table.timestamp('returned_date');
    table.integer('issued_by').references('id').inTable('users');
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull().defaultTo(knex.raw('now()'));
  });
}

/**
 * Drop rents.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable(TABLE_NAME, (table) => {
    table.dropForeign('movie_id');
    table.dropForeign('user_id');
    table.dropForeign('issued_by');
  });
}
