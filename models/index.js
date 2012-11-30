
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , config = require('../config').mongodb;

/**
 * Expose mongoose.
 */

exports.mongoose = mongoose;

/**
 * Expose mongoose connection.
 */

var db = exports.db = process.env.MONGOLAB_URI
  ? mongoose.createConnection(process.env.MONGOLAB_URI)
  : mongoose.createConnection(config.host, config.database);

/**
 * Expose models.
 */

exports.Project = db.model('Project', require('./project'));
exports.Tag = db.model('Tag', require('./tag'));
exports.Content = db.model('Content', require('./content'));