var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var preferenceSchema = new Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "client",
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "service",
    required: true,
  },
  employe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employe",
    required: true,
  },
  collection: "preferences",
});

module.exports = mongoose.model("preferences", preferenceSchema);
