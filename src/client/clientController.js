var clientService = require("./clientService");

var inscriptionClient = async (req, res) => {
  var status = await clientService.inscriptionClientService(req.body);
  if (status) {
    res.send({ status: true, message: "User created successfully" });
  } else {
    res.send({ status: false, message: "Error creating user" });
  }
};

module.exports = {
  inscriptionClient,
};
