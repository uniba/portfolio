
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , resource = require('express-resource')
  , pad = require('pad-component')
  , colors = require('colors')
  , routes = require('./routes')
  , project = require('./routes/project')
  , tag = require('./routes/tag')
  , config = require('./config');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
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

app.get('/', project.index);
app.resource('project', project);
app.resource('tag', tag);

Object.keys(app.routes).forEach(function(method) {
  app.routes[method].forEach(function(route) {
    console.log('%s : %s', pad.left(route.method.toUpperCase(), 6).yellow, route.path.grey);
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
