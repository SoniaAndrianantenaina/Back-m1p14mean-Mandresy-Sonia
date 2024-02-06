const express = require("express");
const router = express.Router();

var clientController = require("../src/client/clientController");
router.route("/client/inscription").post(clientController.inscriptionClient);

module.exports = router;
