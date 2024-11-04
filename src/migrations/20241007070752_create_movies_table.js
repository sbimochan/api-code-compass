const TABLE_NAME = 'movies';

/**
 * Create table movies.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments();
    table.string('name').notNull();
    table.float('rating').notNull();
    table.text('description').notNull();
    table.date('release_date').notNull();
    table.integer('created_by').references('id').inTable('users');
    table.integer('updated_by').references('id').inTable('users');
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull().defaultTo(knex.raw('now()'));
  });
}

/**
 * Drop movies.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable(TABLE_NAME, (table) => {
    table.dropForeign('created_by');
    table.dropForeign('updated_by');
  });
}
