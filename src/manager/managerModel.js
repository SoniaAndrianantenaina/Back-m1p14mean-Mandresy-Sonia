var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var managerSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  mdp: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("manager", managerSchema,"managers");
