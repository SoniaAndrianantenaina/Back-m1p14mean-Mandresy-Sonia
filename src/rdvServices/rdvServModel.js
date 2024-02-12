var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var rdvServSchema = new Schema({
  rdv: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "rdv",
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
  heure: {
    type: Number,
    required: true,
  },
  collection: "rdv_services",
});

module.exports = mongoose.model("rdvServices", rdvServSchema);
