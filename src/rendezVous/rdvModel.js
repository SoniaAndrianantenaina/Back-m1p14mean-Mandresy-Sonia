var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var rdvSchema = new Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "client",
    required: true,
  },
  date_priseRDV: {
    type: Date,
    required: true,
  },
  dateRDV: {
    type: Date,
    required: true,
  },
  paye: {
    type: Boolean,
    required: true,
  },
  montant_Total: {
    type: Number,
    required: true,
  },
  collection: "rdvs",
});

module.exports = mongoose.model("rdv", rdvSchema);
