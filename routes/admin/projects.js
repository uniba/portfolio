
var path = require('path')
  , fs = require('fs')
  , base64id = require('base64id')
  , models = require('../../models')
  , Project = models.Project
  , Tag = models.Tag;

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
  var project = {
      title: ''
    , description: ''
    , tags: ['', '', '']
    , contents: ['', '', '']
    , images: ['', '', '']
  };

  res.render('admin/projects/new', {title: 'project new', project: project });
};

exports.confirm = function(req, res){
  
  res.render('admin/projects/confirm', {title: 'project new', project: project, method: 'post' });
};


exports.create = function(req, res) {
  var images = req.files.project.images || []
    , imageDatas = {}
    , tags = req.body.project.tags || []
    , youtubes = req.body.project.youtubes || []
    , vimeos = req.body.project.vimeos || [] ;

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
    , youtubes: youtubes
    , vimeos: vimeos
  });

  images.forEach(function(image) {
    if (image.size) {
      var image_path = image.path
        , name = image.name;
        //http://nodejs.org/api/all.html#all_buffer
        // binaryはdeprecatedになるかも
      var data = fs.readFileSync(image_path, 'binary');
      //var data = fs.readFileSync(image_path);
      new_name = base64id.generateId();
      imageDatas[new_name] = {
        data: data, 
        ext: path.extname(name),
      };
    }
  });
  project.images = imageDatas;

  project.save(function(err, project) {    
    if (err) {
      console.log('err:%s', err);
      return res.send(500);
    }
    res.redirect('/admin/projects');
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
