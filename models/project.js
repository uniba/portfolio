
var Schema = require('mongoose').Schema
  , lastMod = require('./plugins/last_modified')
  , ContentSchema = require('./content');

var ProjectSchema = module.exports = new Schema({
    title: { type: String, unique: true }
  , _contents: [{ type: Schema.Types.ObjectId, ref: 'Content' }]
  , description: String
  , tags: [{ type: String }]
  , created: { type: Date, default: Date.now, index: true }
});

ProjectSchema.plugin(lastMod);