import db from '../db';

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
}

export default Movie;
