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
  var result = await clientService.login(req.body.clientDetails,req.body.token_appareil);
  res.send(result);
};

module.exports = {
  inscriptionClient,
  loginClient,
};
