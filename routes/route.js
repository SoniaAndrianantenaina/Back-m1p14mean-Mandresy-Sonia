const express = require("express");
const router = express.Router();
var managerContre=require('../src/manager/managerController');
var employeeContre=require('../src/employes/employeController');
var clientController = require("../src/client/clientController");

router.post('/manager/authentification',managerContre.to_logfn);
router.post('/manager/ajout_employe',employeeContre.save_emp_fn);
router.route("/client/inscription").post(clientController.inscriptionClient);

module.exports = router;


 
