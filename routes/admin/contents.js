
/**
 * Module dependencies.
 */

var fs = require('fs')
  , models = require('../../models')
  , Project = models.Project
  , Content = models.Content;

exports.index = function(req, res) {
  Content
    .find()
    .exec(function(err, contents) {
      if (err) throw err;
      res.render('admin/contents', { contents: contents });
    });
};

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

//TODO contentからpopulateでひっぱてきやる。
//おそらく非同期の処理で失敗している。    

exports.delete = function(req, res){
  var id = req.params.id;
  console.log('content delete id:', id);
  Content.findByIdAndRemove(id)
    .populate('_project')
    .exec(function(err, content){
      if (err) res.send({status: 'error'});
      console.log('content:', content);
      console.log('_project:', content._project);
      if(content._project){
        
        var project = content._project;
        console.log('project._contents:',project._contents);
        project._contents = removeElementFromArrayByValue(project._contents, content._id)
        project.save(function(err, project){
          if (err) res.send({status: 'error'});
          res.send({status: 'success'});
        });       
      }else{
        res.send({status: 'success'});
      }

      
    });
}

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

