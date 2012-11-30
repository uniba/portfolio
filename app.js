
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , exec = require('child_process').exec
  , cons = require('consolidate')
  , resource = require('express-resource')
  , pad = require('pad-component')
  , colors = require('colors')
  , routes = require('./routes')
  , config = require('./config');

var app = express()
  , server = module.exports = http.createServer(app);

app.configure(function() {
  var user = process.env.ADMIN_USERNAME || 'user'
    , pass = process.env.ADMIN_PASSWORD || 'pass'
    , basicAuth = express.basicAuth(user, pass);

  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  
  app.engine('.ejs', cons.ejs);
  app.engine('.html', cons.ejs);
  app.engine('.jade', cons.jade);
  
  app.enable('trust proxy');
  
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.compress());
  
  if ('development' === app.get('env')) {
    app.use(function(req, res, next) {
      exec('make', next);
    });
  }
  if ('production' === app.get('env')) {
    app.use('/admin', basicAuth);
  }
  
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

app.get('/projects', routes.projects.index);
app.get('/projects/:id', routes.projects.show);
app.get('/admin', routes.admin.index);
app.resource('admin/projects', routes.admin.projects);
app.resource('admin/tags', routes.admin.tags);

//console.log(app.routes.get[2].callbacks[0].constructor.name);

Object.keys(app.routes).forEach(function(method) {
  app.routes[method].forEach(function(route) {
    console.log('%s : %s', pad.left(route.method.toUpperCase(), 6).yellow, route.path.grey);
  });
});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
