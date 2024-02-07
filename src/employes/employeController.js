var empservice=require('./employeService');
var save_emp_fn=async(req,res)=>{
    let status=await empservice.saveemp(req.body);
    if(status){
        res.send({"status": true , "data": "Employé enregistré!"});
    }
    else{
        res.send({"status": false , "data": "Employé non enregistré!"});

    }
}

module.exports={save_emp_fn}