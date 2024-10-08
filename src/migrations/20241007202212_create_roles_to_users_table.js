const TABLE_NAME = 'roles_to_users';

/**
 * Create table roles_to_users.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments();
    table.integer('user_id').unsigned().notNull();
    table.integer('role_id').unsigned().notNull();
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
    
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.foreign('role_id').references('id').inTable('roles').onDelete('CASCADE');
  });
}

/**
 * Drop roles_to_users.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable(TABLE_NAME, (table) => {
    table.dropForeign('user_id');
    table.dropForeign('role_id');
  });
}
