import db from '@/db';

const TABLE_NAME = 'rents';

/**
 * Movie model.
 */
class Rent extends db.Model {
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
   * Get related movie.
   */
  movie() {
    return this.belongsTo('Movie');
  }

  /**
   * Get related customer.
   */
  customer() {
    return this.belongsTo('Customer');
  }
}

export default Rent;
