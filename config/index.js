
/**
 * Module dependencies.
 */
 
var fs = require('fs')
  , path = require('path')
  , config = {};
console.log(__dirname);
fs.readdirSync(__dirname).forEach(function(filename) {
  if (!/\.json/.test(filename)) return;
  var name = path.basename(filename, '.json');
  config[name] = require(path.join(__dirname, filename));
});

/**
 * Expose config.
 */

module.exports = config;