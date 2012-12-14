
var debug = require('debug')('routes:contents')
  , models = require('../models')
  , Content = models.Content;

exports.show = function(req, res) {
  var id = req.params.id;
  Content
    .findOne({ _id: id })
    .exec(function(err, content) {
      if (err) {
        debug('err:', err);
        return res.send(500, {status: 'error', info:err });
      }
      res.send(content);
    });
};

exports.image = function(req, res) {
  var id = req.params.id;

  Content
    .findOne({ _id: id })
    .exec(function(err, content) {
      if (err) {
        debug('err:', err);
        return res.send(500, {status: 'error', info:err });
      }
      console.log(content);
      if(content){
        res.type(content.get('mime'));
        res.send(content.get('image'));
      }else{
        res.send(404, 'Sorry, we cannot find that!');
      }
    });
};