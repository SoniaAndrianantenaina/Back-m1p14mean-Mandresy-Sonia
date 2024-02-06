var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var typeDepenseSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  collection: "type_depenses",
});

module.exports = mongoose.model("typeDepense", typeDepenseSchema);
