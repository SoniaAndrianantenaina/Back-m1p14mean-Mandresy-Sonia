var managerService = require('./managerService');
var to_logfn=async(req,res)=>{
    var result=await managerService.logIn(req.body);

    if(result){
        res.send({"status": true , "data": "connected!"});
    }
    else{
        res.send({"status": false,"data": "Authentification failed!"});
    }
}

module.exports={to_logfn}