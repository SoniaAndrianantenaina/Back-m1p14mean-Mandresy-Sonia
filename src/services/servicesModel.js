var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  nom: {
    type: String,
    required: true,
    unique: true
  },
  delai: {
    type: Number,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  commission: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("service", userSchema,"services");
