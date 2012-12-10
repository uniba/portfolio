
var $ = require('zepto-component')
  , Overlay = require('overlay')
  , overlay = Overlay()
  , ProjectEditView = require('project-edit-view')
  , Project = require('project-model')
  , Spinner = require('spinner')
  , page = require('page')
  , request = require('superagent');

page('*', function(ctx, next) {
  var spinner = new Spinner();

  spinner
    .size(100)
    .speed(100)
    .text('loading...')
    .el.classList.add('spinner');
    
  $(function() {
    if (ctx.init) return next();
    
    document.body.appendChild(spinner.el);
    
    request(ctx.path)
      .end(function(res) {
        if (!res.ok) return overlay.hide() && document.body.removeChild(spinner.el);
        $('div#body').empty();
        $('div#body').append($(res.text).find('#body').children());
        $(spinner.el).addClass('hide-out');
                
        setTimeout(function() {
          document.body.removeChild(spinner.el);
        }, 300);
        
        next();
      });
  });
});

page('/admin', function(ctx) {
});

page('/admin/projects/new', function(ctx) {
  var project = new Project()
    , el = $('form#form_project').get(0)
    , view = new ProjectEditView(project, el);
  
  view.on('done', function(res) {
    page('/admin');
  });

  view.on('error', function(res) {
    alert('error');
  });
});

page('/admin/projects/:id', function(ctx) {
  var id = ctx.params.id;
});

page('/admin/projects/:id/edit', function(ctx) {
  console.log($('[data-project]').data('project'));
  var data = JSON.parse($('[data-project]').data('project'))
    , project = new Project(data)
    , el = $('form#form_project').get(0)
    , view = new ProjectEditView(project, el);
  
  view.on('done', function(res) {
    page('/admin');
  });
  
  view.on('error', function(res) {
    alert('error');
  });
});

page();