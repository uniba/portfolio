
var models = require('../models')
  , Project = models.Project;
  
exports.index = function(req, res) {
  Project
    .find()
    .sort('-created')
    .exec(function(err, projects) {
      if (err) return res.send(500, err);
      res.send(projects);
    });
};

exports.show = function(req, res) {
  var id = req.params.id;
  
  Project
    .findOne({ _id: id })
    .exec(function(err, project) {
      if (err) throw err;
      if (!project) return res.send(404);
      res.send(project);
    });
};
