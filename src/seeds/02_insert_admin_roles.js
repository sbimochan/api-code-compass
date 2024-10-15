const ROLES_TABLE_NAME = 'roles';
const USERS_TABLE_NAME = 'users';
const ROLES_TO_USERS_TABLE_NAME = 'roles_to_users';

/**
 * Delete existing entries and seed values for `roles` and `roles_to_users` tables.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex(ROLES_TO_USERS_TABLE_NAME)
    .del()
    .then(() => knex(ROLES_TABLE_NAME).del())
    .then(() => {
      return knex(ROLES_TABLE_NAME).insert([
        { name: 'admin', description: 'User with admin role.' },
        { name: 'customer', description: 'User with customer role.' }
      ]);
    })
    .then(() => {
      return knex(ROLES_TABLE_NAME).select('id', 'name');
    })
    .then((roles) => {
      return knex(USERS_TABLE_NAME)
        .select('id', 'username')
        .then((users) => ({ roles, users }));
    })
    .then(({ roles, users }) => {
      const roleIdAdmin = roles.find((role) => role.name === 'admin').id;
      const roleIdCustomer = roles.find((role) => role.name === 'customer').id;
      const adminId = users.find((user) => user.username === 'admin').id;
      const userId = users.find((user) => user.username === 'user').id;

      return knex(ROLES_TO_USERS_TABLE_NAME).insert([
        { role_id: roleIdAdmin, user_id: adminId },
        { role_id: roleIdCustomer, user_id: userId }
      ]);
    });
}
