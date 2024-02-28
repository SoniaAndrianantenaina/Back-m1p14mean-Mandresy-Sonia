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
  var result = await clientService.login(
    req.body.clientDetails,
    req.body.token_appareil
  );
  if (result == 0) {
    res.send({ status: false, data: "Adresse email incorrect" });
  } else {
    let data = {
      idClient: result,
    };
    res.send({ status: true, data: data });
  }
};

module.exports = {
  inscriptionClient,
  loginClient,
};
