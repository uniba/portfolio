
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , cons = require('consolidate')
  , resource = require('express-resource')
  , pad = require('pad-component')
  , colors = require('colors')
  , routes = require('./routes')
  , config = require('./config');

var app = express()
  , server = module.exports = http.createServer(app);

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.engine('.ejs', cons.ejs);
  app.engine('.html', cons.ejs);
  app.engine('.jade', cons.jade);
  app.enable('trust proxy');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.compress());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.resource('projects', routes.projects);
app.resource('tags', routes.tags);

Object.keys(app.routes).forEach(function(method) {
  app.routes[method].forEach(function(route) {
    console.log('%s : %s', pad.left(route.method.toUpperCase(), 6).yellow, route.path.grey);
  });
});

server.listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
