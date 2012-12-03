
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
    
  overlay = Overlay();
  // overlay.show();
  
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
  overlay.hide();
});

page('/admin/projects/new', function(ctx) {
  var project = new Project()
    , el = $('div#body').children().get(0)
    , view = new ProjectEditView(project, el);
  
  overlay.hide();
});

page('/admin/projects/:id', function(ctx) {
  var id = ctx.params.id;
  
  overlay.hide();
});

page('/admin/projects/:id/edit', function(ctx) {
  overlay.hide();
});

page();