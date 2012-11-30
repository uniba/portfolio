
var classes = require('classes')
  , domify = require('domify')
  , html = require('./template')
  , View = require('view');

module.exports = ProjectEditView;

function ProjectEditView(project) {
  View.call(this, project, domify(html));
  this.classes = classes(this.el);
}

ProjectEditView.prototype.__proto__ = View.prototype;


