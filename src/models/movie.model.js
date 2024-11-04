import db from '@/db';

import Rent from './rent.model';

const TABLE_NAME = 'movies';

/**
 * Movie model.
 */
class Movie extends db.Model {
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
   * Get rentals.
   */
  rentals() {
    return this.hasMany(Rent);
  }
}

export default Movie;
