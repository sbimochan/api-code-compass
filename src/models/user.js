import omit from 'lodash/omit';

import db from '@/db';

import Rent from './rent';
import Role from './role';

const TABLE_NAME = 'users';

/**
 * User model.
 */
class User extends db.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   * Get hasTimestamps.
   */
  get hasTimestamps() {
    return true;
  }

  /**
   * User has many rents.
   */
  rents() {
    return this.hasMany(Rent);
  }

  /**
   *  Relationship with the Role model (many-to-many).
   */
  roles() {
    return this.belongsToMany(Role, 'roles_to_users', 'user_id', 'role_id');
  }

  /**
   * Filter sensitive data.
   */
  filterSensitiveData() {
    const attrs = this.toJSON();

    const user = omit(attrs, ['password']);

    return user;
  }
}

export default User;
