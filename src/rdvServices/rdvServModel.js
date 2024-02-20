var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var rdvServSchema = new Schema({
  rdv: {
    type: Schema.Types.ObjectId,
    ref: "rdv",
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
  heure_debut: {
    type: Number,
    required: true,
  },
  heure_fin: {
    type: Number,
    required: true,
  },
  fait: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("rdvServices", rdvServSchema, "rdvServices");
