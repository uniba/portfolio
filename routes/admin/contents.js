
/**
 * Module dependencies.
 */

var fs = require('fs')
  , models = require('../../models')
  , Project = models.Project
  , Content = models.Content;

exports.create = function(req, res) {
  var url = req.body.url
    , files = req.files;
  
  if (!files) {
    var content = new Content();
    
    return content 
      .set('url', url)
      .save(function(err, content) {
        if (err) throw err;
        res.send(content);
      });
  }
  
  fs.readFile(files.file.path, function(err, data) {
    if (err) throw err;
    
    var content = new Content();

    content
      .set('type', 'image')
      .set('mime', files.file.mime)
      .set('image', data)
      .save(function(err, content) {
        if (err) throw err;
        res.send(content);
      });
  });
};