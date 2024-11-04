import _ from 'lodash';

/**
 * Converts an object's keys from snake_case to camelCase.
 * Recursively applies the transformation for nested objects or arrays.
 *
 * @param {Object|Array} obj - The object or array to convert.
 * @returns {Object|Array} - The object or array with camelCase keys.
 */
function toCamelCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCase(v));
  } else if (_.isObject(obj)) {
    return _.mapKeys(obj, (_value, key) => _.camelCase(key));
  }

  return obj;
}

/**
 * Converts an object's keys from camelCase to snake_case.
 * Recursively applies the transformation for nested objects or arrays.
 *
 * @param {Object|Array} obj - The object or array to convert.
 * @returns {Object|Array} - The object or array with snake_case keys.
 */
function toSnakeCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map((v) => toSnakeCase(v));
  } else if (_.isObject(obj)) {
    return _.mapKeys(obj, (_value, key) => _.snakeCase(key));
  }

  return obj;
}

/**
 * Bookshelf.js plugin to automatically convert between snake_case and camelCase
 * for all model attributes except timestamps, focusing on the toJSON method.
 *
 * @param {Object} bookshelf - The Bookshelf.js instance.
 */
export function caseConversionPlugin(bookshelf) {
  bookshelf.Model = bookshelf.Model.extend({
    /**
     * Override the toJSON method to convert model attributes from snake_case to camelCase
     * for API responses. It skips handling timestamps and focuses on other attributes.
     *
     * @param {Object} options - Serialization options (optional).
     * @returns {Object} - The serialized data with camelCase keys.
     */
    toJSON(options) {
      // Get the raw attributes from the parent class's toJSON method
      const attrs = bookshelf.Model.prototype.serialize.call(this, options);

      // Convert all attributes to camelCase
      return toCamelCase(attrs);
    },

    /**
     * Converts camelCase attributes to snake_case before saving to the database.
     * This method is called when data is being inserted or updated in the database.
     *
     * @param {Object} attributes - The model attributes to be saved.
     * @returns {Object} - The formatted attributes with snake_case keys.
     */
    format(attributes) {
      return toSnakeCase(attributes);
    }
  });
}
