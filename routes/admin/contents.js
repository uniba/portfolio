var fs = require('fs')
  , models = require('../../models')
  , Project = models.Project
  , Content = models.Content;

exports.create = function(req, res) {
  if(req.files.file){
    console.log('file');
    var type = req.files.file.type
      , mime = req.files.file.mime
      , imagePath = req.files.file.path;

    fs.readFile(imagePath, 'binary', function(err, data) {
      if (err) throw err;
      var content = new Content({
        type: type,
        mime: mime,
        image: data
      });

      content.save(function(err, content) {
        if (err) throw err;
        res.send(content);
      });
    });
  }else{

  }

};