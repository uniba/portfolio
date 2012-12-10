
var qs = require('querystring')
  , parse = require('url').parse
  , request = require('request');

module.exports = function(schema, options) {
  schema.pre('save', function(next) {
    var self = this
      , jsonUrl
      , videoId
      , url = this.get('url');

    if (null == url) return next();

    url = parse(this.get('url'));
    
    if ('vimeo.com' !== url.hostname) return next();
    
    videoId = url.pathname.slice(1);
    // ref. http://developer.vimeo.com/apis/simple
    jsonUrl = 'http://vimeo.com/api/v2/video/' + videoId + '.json';
    
    request({ url: jsonUrl, json: true }, function(err, res, body) {
      if (err) return next(err);
      
      self
        .set('type', 'vimeo')
        .set('extend', body[0])
        .set('title', body[0].title)
      
      request({ url: body[0].thumbnail_large, encoding: null }, function(err, res, body) {
        if (err) return next(err);
        self
          .set('mime', res.headers['content-type'])
          .set('image', body);
        next();
      });
    });
  });
};