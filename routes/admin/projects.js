
var path = require('path')
  , fs = require('fs')
  , base64id = require('base64id')
  , Batch = require('batch')
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
  var batch = new Batch()
    , project = new Project(req.body.project)
    , contents = req.body.contents;
  
  project
    .set('_contents', contents.id)
    .save(function(err, project) {
      if (err) return res.send(500);
      
      contents.id.forEach(function(id) {
        batch.push(function(done) {
          Content
            .findOne(id)
            .exec(function(err, content) {
              if (err) throw err;
              content.set('_project', project._id).save(done);
            });
        });
      });
      
      batch.end(function() {
        res.redirect('/admin');
      });
    });
};

exports.show = function(req, res) {
  var id = req.params.project;
  
  Project
    .findOne({ _id: id })
    .populate('_contents')
    .exec(function(err, project) {
      if (err) throw err;
      res.render('admin/projects/show', { title: project.title, project: project });
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
