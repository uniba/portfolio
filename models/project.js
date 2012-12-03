
var Schema = require('mongoose').Schema
  , ContentSchema = require('./content');

var ProjectSchema = module.exports = new Schema({
    title: { type: String, unique: true }
  , _contents: [{ type: Schema.Types.ObjectId, ref: 'Content' }]
  , description: String
  , tags: [{ type: String }]
});

