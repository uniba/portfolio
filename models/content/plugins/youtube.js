
var qs = require('querystring')
  , parse = require('url').parse
  , request = require('request');

module.exports = function(schema, options) {
  schema.pre('save', function(next) {
    var self = this
      , json
      , videoId
      , url = parse(this.get('url'));
    
    if ('www.youtube.com' !== url.hostname) return next();
    
    videoId = qs.parse(url.query).v;
    json = 'http://gdata.youtube.com/feeds/api/videos/' + videoId + '?alt=json';
    
    request({ url: json, json: true }, function(err, res, body) {
      var thumbUrl = 'http://i.ytimg.com/vi/' + videoId + '/0.jpg';
      
      self
        .set('type', 'youtube')
        .set('extend', JSON.stringify(body))
        .set('title', body.entry.title.$t);
      
      request({ url: thumbUrl, encoding: null }, function(err, res, body) {
        self
          .set('mime', res.headers['content-type'])
          .set('image', body);
        next();
      });
    });
  });
};
