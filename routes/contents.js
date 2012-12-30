
var models = require('../models')
  , Content = models.Content;

exports.show = function(req, res) {
  var id = req.params.id;
  Content
    .findOne({ _id: id })
    .select({ image: 0 })
    .populate('_project')
    .exec(function(err, content) {
      if (err) {
        return res.send(500, { error: err });
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
        return res.send(500, { error: err });
      }
      if (!content) {
        return res.send(404);
      }
      res.type(content.get('mime') || 'bin');
      res.send(content.get('image'));
    });
};