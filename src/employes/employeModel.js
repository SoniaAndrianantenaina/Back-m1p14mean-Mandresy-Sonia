var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var employeSchema = new Schema({
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
  h_debut: {
    type: Number,
    required: true,
  },
  h_fin: {
    type: Number,
    required: true,
  }
 
});

module.exports = mongoose.model("employe", employeSchema,'employes');
