
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
  , request = require('superagent')
  , keyname = require('keyname');

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

  View.call(this, project, el || dom(html));
  this.dom = dom(this.el);
  this.tags = Pillbox(dom(this.el).find('#tags').get(0));
  this.contents = dom(this.el).find('#contents').get(0);
  this.drop = Dropload(dom(this.el).find('#drop').get(0));
  
  if ('put' === this.el.querySelector('[name=_method]').value) {
    this.el.action += '/' + this.obj.get('_id');
  }
 
  if (project.tags()) {
    project.tags().forEach(function(el, index) {
      self.tags.add(el);
    });
  }
  
  Object.keys(this.obj.attrs).forEach(function(key, index) {
    var val = self.obj.get(key)
      , el = self.dom.find('[name="project[' + key + ']"]');
    
    if (val === void 0) return;
    if (el.length() < 1) return;
    
    el.get(0).value = val;
  });
    
  this.dom.find('#contents').on('keydown', function(e) {
    var self = this;
     
    if ('enter' !== keyname(e.which)) return;
    
    this.disabled = 'disabled';
    
    request
      .post('/admin/contents')
      .send({ url: this.value })
      .end(function(res) {
        self.disabled = null;
        console.log(res);
        if (!res.ok) {
        }
        $form.append('<input type="hidden" name="contents[id][]" value="' + res.body._id + '">');
        self.value = '';
      });
    
    e.preventDefault();
  });

  this.dom.on('submit', function(e) {
    var data = $form.serializeArray()
      , submit = document.querySelector('input[type=submit]');
    
    e.preventDefault();
    submit.disabled = 'disabled';
    
    var tags = $.map(self.tags.tags.vals, function(tag, i) {
      return { name: 'project[tags][]', value: tag };
    });
    
    data = data.concat(tags);
    
    request
      .post(self.el.action)
      .send($.param(data))
      .end(function(res) {
        if (!res.ok) {
          submit.disabled = null;
          return self.emit('error', res);
        }
        self.emit('done', res);
      });
  });
  
  this.drop.on('error', function(err) {
    console.log(arguments);
  });
  
  this.drop.on('upload', function(upload) {
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

    upload.to('/admin/contents');
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