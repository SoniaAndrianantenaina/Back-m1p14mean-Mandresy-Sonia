var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var notifSchema = new Schema({
    offre_speciale: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "offreSpeciale",
        required: true,
      },
  date_envoie: {
    type: Date,
    required: true,
  }
});

module.exports = mongoose.model("notification", notifSchema, "notifications");
