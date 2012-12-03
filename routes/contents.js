
var models = require('../models')
  , Content = models.Content;

exports.show = function(req, res) {
  var id = req.params.id;
  Content
    .findOne({ _id: id })
    .exec(function(err, content) {
      if (err) throw err;
      res.send(content);
    });
};

exports.image = function(req, res) {
  var id = req.params.id;

  Content
    .findOne({ _id: id })
    .exec(function(err, content) {
      res.type(content.get('mime'));
      res.send(new Buffer(content.get('image'), 'binary'));
    });
};