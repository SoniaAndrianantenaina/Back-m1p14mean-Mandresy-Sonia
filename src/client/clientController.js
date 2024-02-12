var clientService = require("./clientService");

var inscriptionClient = async (req, res) => {
  var status = await clientService.inscriptionClientService(req.body);
  if (status) {
    res.send({ status: true, message: "User created successfully" });
  } else {
    res.send({ status: false, message: "Error creating user" });
  }
};

var loginClient = async (req, res) => {
  var result = await clientService.login(req.body);
  if (result == 0) {
    res.send({ status: false, data: "Adresse mail incorrect" });
  } else if (result == 1) {
    res.send({ status: false, data: "Mot de passe incorrect" });
  } else {
    res.send({ status: true, data: "Connecté!" });
  }
};

module.exports = {
  inscriptionClient,
  loginClient,
};
