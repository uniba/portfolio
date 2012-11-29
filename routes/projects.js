
var partials = require('express-partials')
  , models = require('../models')
  , Project = models.Project
  , Tag = models.Tag;

exports.index = function(req, res) {
  Project.find()
    .sort('-created')
    .exec(function(err, projects) {
      if (err) return res.send(500);
      res.render('project/index.ejs', { title: "project list", projects: projects });
    });
};

exports.new = function(req, res) {
  var project = new Project({
      title: ""
    , description: ""
    , tags:['','','']
  });

  res.render('project/form.ejs', { title: "project new", project: project });
};

exports.create = function(req, res) {
  console.log(req.body);
  var tags = req.body.project.tags;
  var project = new Project({
    title: req.body.project.title,
    description: req.body.project.description,
    tags: tags
  });

  tags.forEach(function(tag) {
    new Tag({
      name: tag
    }).save(function(err,tag) {
      if (err) return console.log('Tag err');
    });
  });

  project.save(function(err,project) {
    if (err) return res.send('error');

    res.redirect('/project');
  });
};

exports.show = function(req, res) {
  res.send('show forum ' + req.params.forum);
};

exports.edit = function(req, res) {
  res.send('edit forum ' + req.params.forum);
};

exports.update = function(req, res) {
  res.send('update forum ' + req.params.forum);
};

exports.destroy = function(req, res) {
  res.send('destroy forum ' + req.params.forum);
};
