const express=require('express');
const router= express.Router();
var managerContre=require('../src/manager/managerController');
var employeeContre=require('../src/employes/employeController'); 

router.post('/manager/authentification',managerContre.to_logfn);
router.post('/manager/ajout_employe',employeeContre.save_emp_fn);
module.exports = router