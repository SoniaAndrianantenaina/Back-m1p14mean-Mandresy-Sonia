var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var employeSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  mdp: {
    type: String,
    required: true,
  },
  h_debut: {
    type: String,
    required: true,
  },
  h_fin: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("employe", employeSchema, "employes");
