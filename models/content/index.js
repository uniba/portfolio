
var fs = require('fs')
  , path = require('path')
  , Schema = require('mongoose').Schema;

var ContentSchema = module.exports = new Schema({
    title: { type: String, unique: true }
  , _project: { type: Schema.Types.ObjectId, ref: 'Project' }
  , type: { type: String }
  , url: { type: String }
  , image: { type: Buffer }
  , mime: { type: String }
  , extend: { type: Schema.Types.Mixed }
});

fs.readdirSync(path.join(__dirname, 'plugins')).forEach(function(filename) {
  if (!/\.js$/.test(filename)) return;
  var name = path.basename(filename, '.js');
  ContentSchema.plugin(require(path.join(__dirname, 'plugins', filename)));
});