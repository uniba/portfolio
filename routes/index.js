
exports.admin = require('./admin');
exports.projects = require('./projects');
exports.tags = require('./tags');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index.ejs', { title: 'Express' });
};