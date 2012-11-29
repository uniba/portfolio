
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , config = require('../config');

var TagSchema = module.exports = new Schema({
    name: { type: String, unique: true }
});
