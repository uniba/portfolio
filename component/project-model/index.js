
var model = require('model');

module.exports = model('Project')
  .attr('_id')
  .attr('title')
  .attr('description')
  .attr('credit')
  .attr('urls')
  .attr('tags');
