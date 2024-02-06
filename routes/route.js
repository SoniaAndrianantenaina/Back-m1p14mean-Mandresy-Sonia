const express=require('express');
const router= express.Router();
var managerContre=require('../src/manager/managerController');

router.post('/manager/authentification',managerContre.to_logfn)

module.exports = router