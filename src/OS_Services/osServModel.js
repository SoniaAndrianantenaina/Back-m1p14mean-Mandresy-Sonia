var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var osServSchema = new Schema({
  offre_speciale: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "offreSpeciale",
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "service",
    required: true,
  },
  pourcentage: {
    type: Number,
    required: true,
  },
  collection: "os_services",
});

module.exports = mongoose.model("osServices", osServSchema);
