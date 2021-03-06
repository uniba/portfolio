
var path = require('path')
  , fs = require('fs')
  , Batch = require('batch')
  , debug = require('debug')('routes:admin:project')
  , models = require('../../models')
  , Project = models.Project
  , Tag = models.Tag
  , Content = models.Content;

exports.index = function(req, res) {
  Project
    .find()
    .populate('_contents', { image: 0 }, {}, { limit: 1 })
    .sort('-created')
    .exec(function(err, projects) {
      if (err) {
        debug('err:', err);
        return res.send(500, {status: 'error', info:err });
      }
      res.render('admin/projects/index', { title: 'Listing projects', projects: projects });
    });
};

exports.new = function(req, res) {
  var project = new Project();
  res.render('admin/projects/form', { title: 'New project', project: project, method: 'post' });
};

exports.create = function(req, res) {
  var batch = new Batch()
    , project = new Project(req.body.project)
    , contents = req.body.contents;
  console.log('req.body:', req.body);
  project
    .set('_contents', contents.id)
    .save(function(err, project) {
      if (err) {
        debug('err:', err);
        return res.send(500, {status: 'error', info:err });
      }
      
      contents.id.forEach(function(id) {
        batch.push(function(done) {
          Content
            .findOne({ _id: id })
            .exec(function(err, content) {
              if (err) {
                debug('err:', err);
                return res.send(500, {status: 'error', info:err });
              }
              content.set('_project', project._id).save(function(err, content){
                if (err) {
                  debug('err:', err);
                  return res.send(500, {status: 'error', info:err });
                }
                done();
              });
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
    .populate('_contents', { image: 0 })
    .exec(function(err, project) {
      if (err) {
        debug('err:', err);
        return res.send(500, {status: 'error', info:err });
      }
      console.log('project:', project);
      res.render('admin/projects/show', { title: project.title, project: project });
    });
};

exports.edit = function(req, res) {
  var projectId = req.params.project;
  
  Project.findOne({ _id: projectId }, function(err, project) {
    if (err) {
      debug('err:', err);
      return res.send(500, {status: 'error', info:err });
    }
    res.render('admin/projects/form', { title: project.title, project: project, method: 'put' });
  });
};

exports.update = function(req, res) {
  var id = req.params.project
    , attrs = req.body.project
    , contents = req.body.contents.id;
  console.log('req.body:',req.body);
  Project
    .findOne({ _id: id })
    .exec(function(err, project) {
      if (err) {
        debug('err:', err);
        return res.send(500, {status: 'error', info:err });
      }
      if (!project) {
        debug('err:', err);
        return res.send(500, {status: 'error', info:err });
      }
      
      Object.keys(attrs).forEach(function(key, index) {
        project.set(key, attrs[key]);
      });
      project.set('_contents', contents);
      project.save(function(err, project) {
        if (err) {
          debug('err:', err);
          return res.send(500, {status: 'error', info:err });
        }
        res.send(project);
      });
    });  
};

exports.destroy = function(req, res) {
  res.send('destroy forum ' + req.params.forum);
};