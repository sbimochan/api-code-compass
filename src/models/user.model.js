import omit from 'lodash/omit';

import db from '@/db';

import Rent from './rent.model';
import Role from './role.model';

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
    const attrs = this.toJSON({ shallow: false });

    const user = omit(attrs, ['password']);

    return user;
  }
}

export default User;
