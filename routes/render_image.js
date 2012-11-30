var fs = require('fs')
  , path = require('path')
  , models = require('../models')
  , Project = models.Project;


exports.show = function(req, res) {
  console.log(req.params.id);
  var id = req.params.id 
  , name = req.params.name;

    Project.findOne({ _id: id}, function(err, project){
      var ext = project.images[name].ext.replace('.','');
      //console.log(project.images[name].data.constructor.name);
      //res.sendfile('etc/images/-Wkb0msmZg8UdyuzAAAA.jpg');
      //fs.writeFileSync('etc/aa.jpg', project.images[name].data, 'binary')
      //res.set('Accept-Ranges', 'bytes');
      //res.set('Cache-Control', 'public, max-age=0');
      res.type(ext);
      //http://nodejs.org/api/all.html#all_buffer
      // binaryはdeprecatedになるかも
      res.send(new Buffer(project.images[name].data, 'binary'), 200);
      //res.send(buffalo.serialize(project.images[name].data), 200);
    });
  };
