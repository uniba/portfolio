var Schema = require('mongoose').Schema
, config = require('../config');
// , schema = require('./index')
// , Project = schema.Project;

var ProjectSchema = module.exports = new Schema({
  title: String ,
  description: String ,
  tags: Array
});

// ProjectSchema.statics.newProject = function(){
//   var project =  new Project({
//     title: "",
//     description: ""
//   });
//   return project
// }
