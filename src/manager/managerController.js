var managerService = require('./managerService');
var to_logfn=async(req,res)=>{
    var result= await managerService.logIn(req.body);
    if(result==0){
        res.send({"status": false , "data": "Adresse mail incorrect"});
    }
    else if(result==1){
        res.send({"status": false,"data": "Mot de passe incorrect"});
    }
    else{
        res.send({"status": true , "data": "Connecté!"});

    }
}

module.exports={to_logfn}