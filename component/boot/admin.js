
var $ = require('zepto')
  , page = window.page = require('page');

page('*', function(ctx) {
  console.log(JSON.stringify(ctx));
});

page('/admin/projects', function(ctx) {

});

page('/admin/projects/:id', function(ctx) {
  
});

page('/admin/tags', function(ctx) {

});

page();
