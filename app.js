
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , resource = require('express-resource')
  , pad = require('pad-component')
  , colors = require('colors')
  , routes = require('./routes/index')
  , admin = require('./routes/admin')
  , projects = require('./routes/admin/projects')
  , tags = require('./routes/admin/tags')
  , config = require('./config');

var app = express();


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes);

app.get('/admin', admin)
app.resource('admin/project', projects);
app.resource('admin/tag', tags);
//console.log(app.routes.get[2].callbacks[0].constructor.name);
Object.keys(app.routes).forEach(function(method) {
  app.routes[method].forEach(function(route) {
    console.log('%s : %s', pad.left(route.method.toUpperCase(), 6).yellow, route.path.grey);
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
