var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var clientSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mdp: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  collection: "clients",
});

module.exports = mongoose.model("client", clientSchema);
