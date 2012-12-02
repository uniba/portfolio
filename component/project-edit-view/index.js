
/**
 * Module dependencies.
 */

var dom = require('dom')
  , classes = require('classes')
  , html = require('./template')
  , Pillbox = require('pillbox')
  , Dropload = require('dropload')
  , View = require('view');

/**
 * Expose `ProjectEditView`.
 */

module.exports = ProjectEditView;

/**
 * View constructor.
 */

function ProjectEditView(project, el) {
  var self = this;
  
  console.log(project);
  View.call(this, project, el || dom(html));
  this.dom = dom(this.el);
  this.tags = Pillbox(dom(this.el).find('#tags').get(0));
  this.drop = Dropload(dom(this.el).find('#drop').get(0));
  
  if (project.tags()) {
    project.tags().forEach(function(el, index) {
      self.tags.add(el);
    });
  }
  
  this.dom.on('submit', function(e) {
    // TODO: xhr
    e.preventDefault();
  });
  
  this.drop.on('error', function(err) {
    console.log(arguments);
  });
  
  this.drop.on('upload', function(upload) {
    console.log('uploading %s', upload.file.name);
    
    upload.on('progress', function(e) {
      console.log('progress', e);
    });
    
    upload.to('/admin/contents/new');
  });
}

/**
 * Inherits from `View`,
 */

ProjectEditView.prototype.__proto__ = View.prototype;