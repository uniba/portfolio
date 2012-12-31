
var mongoose = require('mongoose')
  , lastMod = require('./plugins/last_modified')
  , Schema = mongoose.Schema;

var TagSchema = module.exports = new Schema({
    name: { type: String, unique: true }
  , showOnIndex: { type: Boolean, default: true }
  , created: { type: Date, default: Date.now, index: true }
});

TagSchema.plugin(lastMod);
