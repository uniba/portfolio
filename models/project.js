
var Schema = require('mongoose').Schema
  , ContentSchema = require('./content');

var ProjectSchema = module.exports = new Schema({
    title: { type: String, unique: true }
  , _contents: { type: Schema.Types.ObjectId, ref: 'Content' }
  , description: String
  , images: Schema.Types.Mixed
  , youtubes: Array
  , vimeos: Array
  , tags: [{ type: String }]
});
