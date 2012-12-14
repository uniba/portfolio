
/**
 * Module dependencies.
 */

var fs = require('fs')
  , debug = require('debug')('routes:admin:contents')
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
        if (err) {
          debug('err:', err);
          return res.send(500, {status: 'error', info:err });
        }
        res.send(content);
      });
  }
  
  fs.readFile(files.file.path, function(err, data) {
    if (err) {
      debug('err:', err);
      return res.send(500, {status: 'error', info:err });
    }
    
    var content = new Content();

    content
      .set('type', 'image')
      .set('mime', files.file.mime)
      .set('image', data)
      .save(function(err, content) {
        if (err) {
          debug('err:', err);
          return res.send(500, {status: 'error', info:err });
        }
        res.send(content);
      });
  });
};

exports.delete = function(req, res){
  var id = req.params.id;
  console.log('content delete id:', id);
  Content.findById(id)
    .populate('_project')
    .exec(function(err, content){
      if (err) {
        debug('err:', err);
        return res.send(500, {status: 'error', info:err });
      }
      if (!content._project) {
        debug('err:', err);
        return res.send(500 ,{status: 'error', info:err });
      }
      var project = content._project;
      project._contents = removeElementFromArrayByValue(project._contents, content._id)
      project.save(function(err, project){
        if (err){
          debug('err:', err);
          return res.send(500 ,{status: 'error', info:err });
        }
        content.remove(function(err, content){
          res.send({status: 'success'});        
        });
      });
    });
}

// arrayの中から引数のvalueを除く
function removeElementFromArrayByValue(arr,value){
  return remove(arr, value);

  function remove(arr, value){
    var index = arr.indexOf(value);
    var array = arr;
    if (index != -1) {
      array.splice(index, 1);
      return remove(array, value);
    }else{
      return array;
    }    
  }
}