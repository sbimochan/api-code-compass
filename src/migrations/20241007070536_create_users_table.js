const TABLE_NAME = 'users';

/**
 * Create table users.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments();
    table.string('username').notNull();
    table.string('full_name').notNull();
    table.string('email').notNull();
    table.string('password').notNull();
    table.boolean('is_admin').notNull().defaultTo(false);
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull().defaultTo(knex.raw('now()'));
  });
}

/**
 * Drop users.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable(TABLE_NAME);
}
