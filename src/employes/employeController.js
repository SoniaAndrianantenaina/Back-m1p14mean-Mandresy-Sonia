var empservice=require('./employeService');
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
    let status=await empservice.update_emp(req.body.id,req.body);
    if(status){
        res.send({"status": true , "data": "Employé mis à jour!"});
    }
    else{
        res.send({"status": false , "data": "Cette email a déjà un compte!"});

    }
}

module.exports={save_emp_fn,get_all_emp_fn,update_emp_fn}