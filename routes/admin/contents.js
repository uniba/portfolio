
/**
 * Module dependencies.
 */

var fs = require('fs')
  , models = require('../../models')
  , Project = models.Project
  , Content = models.Content;

exports.create = function(req, res) {
    var url = req.params.url
      , file = req.files.file;
  
  if (!file) {
    var content = new Content();
    
    return content 
      .set('url', url)
      .save(function(err, content) {
        if (err) throw err;
        res.send(content);
      });
  }
  
  fs.readFile(file.path, 'binary', function(err, data) {
    if (err) throw err;
    
    var content = new Content();

    content
      .set('type', file.type)
      .set('mime', file.mime)
      .set('image', data)
      .save(function(err, content) {
        if (err) throw err;
        res.send(content);
      });
  });
};