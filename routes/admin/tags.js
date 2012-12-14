
var debug = require('debug')('routes:admin:tags')
  , models = require('../../models')
  , Project = models.Project
  , Tag = models.Tag;

exports.index = function(req, res) {
  Tag.find()
    .sort('-created')
    .exec(function(err, tags) {
      if (err) {
        debug('err:', err);
        return res.send(500, {status: 'error', info:err });
      }
      res.render('admin/tags/index', { title: 'tag list', tags:tags });
    });
};

exports.new = function(req, res) {
  res.send('new tag');
};

exports.create = function(req, res) {
  res.send('create tag');
};

exports.show = function(req, res) {
  Tag.findOne({ _id: req.params.tag }, function(err, tag) {
    if (err) {
      debug('err:', err);
      return res.send(500, {status: 'error', info:err });
    }
    console.log([tag.name]);
    Project
      .find()
      .where('tags').in([tag.name])
      .exec(function(err, projects) {
        if (err) {
          debug('err:', err);
          return res.send(500, {status: 'error', info:err });
        }
        res.render('admin/tags/show', {
            title: 'tag show:' + tag.name
          , tag: tag 
          , projects: projects
        });
      });
  });
};

exports.edit = function(req, res) {
  res.send('edit tag ' + req.params.tag);
};

exports.update = function(req, res) {
  res.send('update tag ' + req.params.tag);
};

exports.destroy = function(req, res) {
  res.send('destroy tag ' + req.params.tag);
};