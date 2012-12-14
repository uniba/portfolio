
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

//TODO contentからpopulateでひっぱてきやる。
//おそらく非同期の処理で失敗している。    

exports.delete = function(req, res){
  var id = req.params.id;
  console.log('content delete id:', id);
  Content.findById(id)
    .populate('_project')
    .exec(function(err, content){
      if (err) {
         console.log('52:err:',err);
         throw err;
         //return res.send({status: 'error'});
       }

      console.log('content:', content);
      console.log('_project:', content._project);
      if (!content._project) {
         console.log('59:err:',err);
         throw err;
         //return res.send({status: 'error'});
      }
      var project = content._project;
      console.log('project._contents:',project._contents);
      project._contents = removeElementFromArrayByValue(project._contents, content._id)
      console.log('after project._contents:',project._contents);
      project.save(function(err, project){
        if (err){
         console.log('70:err:',err);
         throw err;
         //return res.send({status: 'error'});
       }
        content.remove(function(err, content){
          res.send({status: 'success'});        
        });
      });
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

