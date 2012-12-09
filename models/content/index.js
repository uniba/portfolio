
var fs = require('fs')
  , path = require('path')
  , lastMod = require('../plugins/last_modified')
  , Schema = require('mongoose').Schema;

var ContentSchema = module.exports = new Schema({
    title: { type: String }
  , _project: { type: Schema.Types.ObjectId, ref: 'Project' }
  , type: { type: String }
  , url: { type: String }
  , image: { type: Buffer }
  , mime: { type: String }
  , extend: { type: Schema.Types.Mixed }
  , created: { type: Date, default: Date.now, index: true }
});

fs.readdirSync(path.join(__dirname, 'plugins')).forEach(function(filename) {
  if (!/\.js$/.test(filename)) return;
  var name = path.basename(filename, '.js');
  ContentSchema.plugin(require(path.join(__dirname, 'plugins', filename)));
});

ContentSchema.plugin(lastMod);