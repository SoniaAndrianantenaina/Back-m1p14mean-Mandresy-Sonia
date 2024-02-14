var empservice=require('./employeService');
var gest_token = require('../Gestion_token');

var save_emp_fn=async(req,res)=>{
    let status=await empservice.saveemp(req.body);
    if(status){
        res.send({"status": true , "data": "Employé enregistré!"});
    }
    else{
        res.send({"status": false , "data": "Cette email a déjà un compte!"});

    }
}

var get_all_emp_fn=async(req,res)=>{
    let employes=await empservice.get_all();
    res.send({"status": true , "data": employes});
}

var update_emp_fn=async(req,res)=>{
    let status=await empservice.update_emp(req.body.id.replace(/"/g, ''),req.body.data);
    if(status){
        res.send({"status": true , "data": "Employé mis à jour!"});
    }
    else{
        res.send({"status": false , "data": "Cette email a déjà un compte!"});

    }
}

var login_fn=async (req,res)=>{
    let status=await empservice.login(req.body);
    if(status==0){
        res.send({"status": false , "data": "Adresse email incorrect"});
    }
    else if(status==1){
        res.send({"status": false , "data": "Mot de passe incorrect"});
    }
    else{
        let data={
            'id':status
        }
        data=gest_token.get_token(data);

        res.send({"status": true , "data": data});
    }
}

var profil_fn = async (req, res) => {
    let user = await empservice.get_profil(req.body.ref.id);
    
    if (user) {
        res.send({"status": true , "data": user});
    }
    else {
        res.send({"status": false , "data": "Session expiré"});
    }
}
module.exports={save_emp_fn,get_all_emp_fn,update_emp_fn,login_fn,profil_fn}