
exports.projects = require('./projects');
exports.tags = require('./tags');
exports.contents = require('./contents');

exports.index = function(req, res) {
  res.render('admin/index', { title: 'Express' });
};
