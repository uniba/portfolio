
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , config = require('../config').mongodb
  , host = process.env.MONGOLAB_URI || config.host;

/**
 * Expose mongoose.
 */

exports.mongoose = mongoose;

/**
 * Expose mongoose connection.
 */

var db = exports.db = mongoose.createConnection(host, config.database);

/**
 * Expose models.
 */

exports.Project = db.model('Project', require('./project'));
exports.Tag = db.model('Tag', require('./tag'));
