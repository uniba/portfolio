var mongoose = require('mongoose')
, Schema = mongoose.Schema
, config = require('../config');
//console.log(config)
// , schema = require('./index')
// , Project = schema.Project;

var TagSchema = module.exports = new Schema({
  name: {type:String, unique: true }
});