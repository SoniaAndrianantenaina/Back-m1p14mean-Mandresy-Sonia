var managerService = require('./managerService');
var gest_token = require('../Gestion_token');
var to_logfn=async(req,res)=>{
    var result= await managerService.logIn(req.body);
    if(result==0){
        res.send({"status": false , "data": "Adresse mail incorrect"});
    }
    else if(result==1){
        res.send({"status": false,"data": "Mot de passe incorrect"});
    }
    else{
        let data={
            'id':result
        }
        data=gest_token.get_token(data);
        req.session.user_Id = result;
        res.send({"status": true , "data": data});

    }
}

module.exports={to_logfn}