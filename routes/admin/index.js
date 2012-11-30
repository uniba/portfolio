
exports.projects = require('./projects');
exports.tags = require('./tags');

exports.index = function(req, res) {
  res.render('admin/index', { title: 'Express' });
};
