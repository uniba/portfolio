
/**
 * Module dependencies.
 */

var dom = require('dom')
  , classes = require('classes')
  , html = require('./template')
  , Pillbox = require('pillbox')
  , Dropload = require('dropload')
  , View = require('view')
  , Emitter = require('emitter')
  , request = require('superagent');

/**
 * Expose `ProjectEditView`.
 */

module.exports = ProjectEditView;

/**
 * View constructor.
 */

function ProjectEditView(project, el) {
  var self = this
    , $form = $('form#form_project');

  View.call(self, project, el || dom(html));
  self.dom = dom(self.el);
  self.tags = Pillbox(dom(self.el).find('#tags').get(0));
  self.contents = Pillbox(dom(self.el).find('#contents').get(0));
  self.drop = Dropload(dom(self.el).find('#drop').get(0));
 
  if (project.tags()) {
    project.tags().forEach(function(el, index) {
      self.tags.add(el);
    });
  }

  self.dom.on('submit', function(e) {
    var data = $form.serializeArray();
    
    var tags = $.map(self.tags.tags.vals, function(tag, i) {
      return { name: 'project[tags][]', value: tag };
    });
    
    data = data.concat(tags);

    var contents = $.map(self.contents.tags.vals, function(content, i) {
      return { name: 'project[contents][]', value: content };
    });
    
    data = data.concat(contents);

    request
      .post('/admin/projects')
      .send($.param(data))
      .end(function(err, res) {
        if (err) return self.emit('error', err);
        self.emit('done', res);
      });

    e.preventDefault();
  });
  
  self.drop.on('error', function(err) {
    console.log(arguments);
  });
  
  self.drop.on('upload', function(upload) {
    console.log('uploading %s', upload.file.name);

    upload.on('error', function(e) {
      console.log('upload error:', e);
    });

    upload.on('abort', function(e) {
      console.log('upload abort:', e);
    });

    upload.on('progress', function(e) {
      console.log('progress', e);
    });

    upload.on('end', function(req) {
      var data = JSON.parse(req.responseText);
      $form
        .append('<input type="hidden" name="contents[id][]" value="' + data._id + '">');
    });

    upload.to('/admin/contents/new');
  });
}

/**
 * Inherits from `View`,
 */

ProjectEditView.prototype.__proto__ = View.prototype;

/**
 * Emitter mix-in.
 */

Emitter(ProjectEditView.prototype);