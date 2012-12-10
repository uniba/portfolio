
/*!
 * lastModifiedPlugin - taken from mongoosejs.com and additional tweaks.
 */

module.exports = exports = function lastModifiedPlugin(schema, options) {
  var props = {}
    , options = options || {};
    
  props[options.name || 'updated'] = Date;
  schema.add(props);
  
  schema.pre('save', function (next) {
    this[options.name || 'updated'] = new Date();
    next();
  });
  
  if (options && options.index) {
    schema.path(options.name || 'updated').index(options.index);
  }
};