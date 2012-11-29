
exports.projects = require('./projects');
exports.tags = require('./tags');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};