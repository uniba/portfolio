
var Schema = require('mongoose').Schema
  , config = require('../config');

var ProjectSchema = module.exports = new Schema({
    title: { type: String, unique: true }
  , description: String
  , tags: Array
  , images: Array
  , youtubes: Array
  , vimeos: Array
});

// ProjectSchema.statics.newProject = function(){
//   var project =  new Project({
//     title: "",
//     description: ""
//   });
//   return project
// }
