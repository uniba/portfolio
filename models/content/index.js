
var Schema = require('mongoose').Schema;

var ContentSchema = module.exports = new Schema({
    title: { type: String, unique: true }
  , _project: { type: Schema.Types.ObjectId, ref: 'Project' }
  , url: { type: String }
  , image: { type: Buffer }
  , extend: { type: Schema.Types.Mixed }
});
