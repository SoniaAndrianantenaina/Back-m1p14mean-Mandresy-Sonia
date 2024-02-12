var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var offreSpecialeSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date_debut: {
    type: Date,
    required: true,
  },
  date_fin: {
    type: Date,
    required: true,
  },
  collection: "offres_speciales",
});

module.exports = mongoose.model("offreSpeciale", offreSpecialeSchema);
