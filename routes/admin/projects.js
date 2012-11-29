
var path = require('path')
  , fs = require('fs')
  , base64id = require('base64id')
  , models = require('../../models')
  , Project = models.Project
  , Tag = models.Tag;

exports.index = function(req, res) {
  Project.find()
    .sort('-created')
    .exec(function(err, projects) {
      if (err) return res.send(500);
      res.render('admin/project/index', { title: 'project list', projects: projects });
    });
};

exports.new = function(req, res){
  var project = {
      _id: ''
    , title: ''
    , description: ''
    , tags: ['', '', '']
    , images: ['', '', '']
  };

  res.render('admin/project/form', {title: 'project new', project: project, method: 'post' });
};

//TODO call とか applyとか
  // var chain = function() {
  //   var fns = [].slice.call(arguments);
  //   function next() {
  //     var fn = fns.shift()
  //       , args = [].slice.call(arguments);
  //     if (fns.length > 0) args = args.concat(next);
  //     fn.apply(null, args);
  //   }
  //   next();
  // };

exports.create = function(req, res) {
  var images = req.files.project.images || []
    , imageDatas = []
    , tags = req.body.project.tags || [];

  images.forEach(function(image) {
    if (image.size) {
      var path = image.path
        , name = image.name;
      
      fs.readFile(path, function(err, data) {
        if (err) {
         console.log('err:%s', err);
         return res.send(500);
        }

        imageDatas.push({
            name: name
          , data: data
        });
      });
    }
  });

  tags.forEach(function(tag) {
    new Tag({
      name: tag
    }).save(function(err, tag) {
      if (err) return console.log('Tag err');
    });
  });

  var project =  new Project({
      title: req.body.project.title
    , description: req.body.project.description
    , tags: tags
    , images: imageDatas
  });

  project.save(function(err, project) {
    if (err) {
      console.log('err:%s', err);
      return res.send(500);
    }
    res.redirect('/admin/project');
  });
};

exports.show = function(req, res) {
  var projectId = req.params.project;
  
  Project.findOne({ _id: projectId }, function(err, project) {
    if (err) return res.send('error: %s',err);
    res.render('admin/project/show', { title: project.title, project: project });
  });
};

exports.edit = function(req, res) {
  var projectId = req.params.project;
  
  Project.findOne({ _id: projectId }, function(err, project) {
    if (err) return res.send('error: %s', err);
    res.render('admin/project/form', { title: project.title, project: project, method: 'put' });
  });
};

exports.update = function(req, res) {
  //console.log(req.files.project.images);
  res.send('update');
};

exports.destroy = function(req, res) {
  res.send('destroy forum ' + req.params.forum);
};

var chain = function() {
  var fns = [].slice.call(arguments);
  function next() {
    var fn = fns.shift()
      , args = [].slice.call(arguments);
    if (fns.length > 0) args = args.concat(next);
    fn.apply(null, args);
  }
  next();
};
