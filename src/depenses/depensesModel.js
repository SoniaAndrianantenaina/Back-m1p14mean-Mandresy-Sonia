var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var depenseSchema = new Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "typeDepense",
    required: true,
  },
  montant: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  collection: "depenses",
});

module.exports = mongoose.model("depenses", depenseSchema);
