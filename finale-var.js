/**
 * getModelIncludes
 * @param {string} modelClassName
 * @returns {Array} Association aliases
 * Association alias strings mapped to model class names
 * Aliases are defined in model.associate blocks
 */
module.exports = {
  getModelIncludes: (modelClassName) => {
      const config =
      {
        application: [
          'replacedby',
          'application_interfaces',
          'application_rationalizations',
          'capabilities',
          'users',
          'business_pocs',
          'technical_pocs',
          'technologies',
        ],
        capability: [ 'replaced_by' ],
        fisma: [
          'fisma_artifacts',
          'issm',
          'isso',
          'replaced_by',
          'technologies',
        ],
        technology: [
          'applications',
          'replaced_by',
          'categories',
          'pocs',
          'reference_documents',
        ],
      };
      return modelClassName? config[modelClassName]: config;
    }
}
