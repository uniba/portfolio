
var models = require('../models')
  , Content = models.Content;

exports.show = function(req, res) {
  var id = req.params.id;
  Content
    .findOne({ _id: id })
    .exec(function(err, content) {
      if (err) res.send(500, 'err:'+err);
      res.send(content);
    });
};

exports.image = function(req, res) {
  var id = req.params.id;

  Content
    .findOne({ _id: id })
    .exec(function(err, content) {
      if (err) res.send(500, 'err:'+err);
      console.log(content);
      if(content){
        res.type(content.get('mime'));
        res.send(content.get('image'));
      }else{
        res.send(404, 'Sorry, we cannot find that!');
      }
    });
};