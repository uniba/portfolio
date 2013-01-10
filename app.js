
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
  , stylus = require('stylus')
  , nib = require('nib')
  , colors = require('colors')
  , routes = require('./routes')
  , admin = require('./routes/admin')
  , projects = require('./routes/admin/projects')
  , tags = require('./routes/admin/tags')
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
  
  app.use(function(req, res, next) {
    var render = res.render;
    
    res.render = function() {
      var args = [].slice.call(arguments);
      args[1] = args[1] || {};
      args[1].layout = false // !!res.req.get('X-PJAX');
      args[1].pretty = true;
      // console.log(args[1]);
      return render.apply(res, args);
    };
    
    next();
  });
  
  app.use(stylus.middleware({
      src: path.join(__dirname, 'public')
    , compile: function(str, path) {
        return stylus(str)
          .set('filename', path)
          .use(nib());
      }
  }));
  
  if ('development' === app.get('env')) {
    app.use(function(req, res, next) {
      exec('make', next);
    });
  }
  if ('production' === app.get('env')) {
    app.use('/admin', basicAuth);
    exec('make', function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      console.log(' building components is done.');
    });
  }
  
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

app.locals.title = 'portfolio';
app.locals.moment = require('moment');

app.get('/projects', routes.projects.index);
app.get('/projects/:id', routes.projects.show);
app.get('/contents/pseudorandom', routes.contents.pseudorandom);
app.get('/contents/:id', routes.contents.show);
app.get('/contents/:id/image', routes.contents.image);

app.get('/admin', routes.admin.projects.index);
app.resource('admin/projects', routes.admin.projects);
app.resource('admin/tags', routes.admin.tags);
app.get('/admin/contents', routes.admin.contents.index);
app.post('/admin/contents', routes.admin.contents.create);
app.del('/admin/contents/:id', routes.admin.contents.delete);

Object.keys(app.routes).forEach(function(method) {
  app.routes[method].forEach(function(route) {
    console.log('%s : %s', pad.left(route.method.toUpperCase(), 6).yellow, route.path.grey);
  });
});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
