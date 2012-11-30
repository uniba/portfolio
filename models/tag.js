
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var TagSchema = module.exports = new Schema({
    name: { type: String, unique: true }
  , showOnIndex: { type: Boolean, default: true }
});
