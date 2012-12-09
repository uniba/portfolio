
/**
 * Module dependencies.
 */

var model = require('model');

var Content = module.exports = model('Content')
  .attr('_id')
  .attr('__v')
  .attr('url')
  .attr('type')
  .attr('image')
  .attr('mime');

Content.prototype.toDataURL = function() {
  var mime = this.mime()
    , image = this.image();
  
  if (!mime) return null;
  return 'data:' + mime + ';base64,' + image;
};