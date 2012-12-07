
var path = require('path')
  , fs = require('fs')
  , base64id = require('base64id')
  , models = require('../../models')
  , Project = models.Project
  , Tag = models.Tag
  , Content = models.Content;

exports.index = function(req, res) {
  Project
    .find()
    .sort('-created')
    .exec(function(err, projects) {
      if (err) return res.send(500);
      res.render('admin/projects/index', { title: 'project list', projects: projects });
    });
};

exports.new = function(req, res){
  res.render('admin/projects/form', {title: 'project new', method: 'post' });
};

exports.create = function(req, res) {
  console.log(req.body);
  var contents = req.body.project.contents;

  // TODO population
  contents.forEach(function(content){
    var content = new Content({url: content});
    
  });

  var project =  new Project({
      title: req.body.project.title
    , description: req.body.project.description
    , tags: req.body.project.tags
  });

  project.save(function(err, project) {    
    if (err) {
      console.log('err:%s', err);
      return res.send(500);
    }
    res.redirect('/admin/');
  });
};

exports.show = function(req, res) {
  var projectId = req.params.project;
  
  Project.findOne({ _id: projectId }, function(err, project) {
    if (err) return res.send('error: %s',err);
    var imageNames = [];
    for (key in project.images) {
      imageNames.push(key);
    };
    res.render('admin/projects/show', { title: project.title, project: project, imageNames:imageNames });
  });
};

exports.edit = function(req, res) {
  var projectId = req.params.project;
  
  Project.findOne({ _id: projectId }, function(err, project) {
    if (err) return res.send('error: %s', err);
    res.render('admin/projects/form', { title: project.title, project: project, method: 'put' });
  });
};

exports.update = function(req, res) {
  //console.log(req.files.project.images);
  res.send('update');
};

exports.destroy = function(req, res) {
  res.send('destroy forum ' + req.params.forum);
};

function chain() {
  var fns = [].slice.call(arguments);
  next();
  function next() {
    var fn = fns.shift()
      , args = [].slice.call(arguments);
    if (fns.length > 0) args = args.concat(next);
    fn.apply(null, args);
  }
};
