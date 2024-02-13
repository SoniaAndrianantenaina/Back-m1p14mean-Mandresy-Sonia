var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var preferenceSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "client",
    required: true,
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: "service",
    required: true,
  },
  employe: {
    type: Schema.Types.ObjectId,
    ref: "employe",
    required: true,
  },
});

module.exports = mongoose.model("preferences", preferenceSchema, "preferences");
