import db from '../db';
import User from './user'; 

const TABLE_NAME = 'roles';

/**
 * Role model.
 */
class Role extends db.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   * Table has timestamps.
   */
  get hasTimestamps() {
    return true;
  }

  /**
   *  Relationship with the User model (many-to-many).
   */
    users() {
      return this.belongsToMany(User, 'roles_to_users', 'role_id', 'user_id');
    }
}

export default Role;
