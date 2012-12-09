
/**
 * Module dependencies.
 */

var model = require('model')
  , Content = require('content-model');

var Project = module.exports = model('Project')
  .attr('_id')
  .attr('__v')
  .attr('_contents')
  .attr('title')
  .attr('description')
  .attr('credit')
  .attr('tags')
  .attr('created')
  .attr('updated');

Project.prototype.contents = function() {
  var contents = []
    , _contents = this.get('_contents');
  
  _contents.forEach(function(content) {
    contents.push(new Content(content));
  });
  
  return contents;
};