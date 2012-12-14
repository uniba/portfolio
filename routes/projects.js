
var debug = require('debug')('routes:projects')
  , models = require('../models')
  , Project = models.Project;
  
exports.index = function(req, res) {
  Project
    .find()
    .sort('-created')
    .exec(function(err, projects) {
      if (err) {
        debug('err:', err);
        return res.send(500, {status: 'error', info:err });
      }
      res.send(projects);
    });
};

exports.show = function(req, res) {
  var id = req.params.id;
  
  Project
    .findOne({ _id: id })
    .exec(function(err, project) {
      if (err) {
        debug('err:', err);
        return res.send(500, {status: 'error', info:err });
      }
      if (!project) {
        debug('err:', err);
        return res.send(404, {status: 'error', info:'projectがありません' });
      }
      res.send(project);
    });
};