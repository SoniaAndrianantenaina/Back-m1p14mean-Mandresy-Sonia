var service_serv= require('./servicesService');
var listefn= async (req,res)=>{
    let liste=await service_serv.get_all_services();
    res.send({"status": true , "data": liste});
};

var save_fn=async (req,res)=>{
    let check= await service_serv.save_service(req.body);

    if(check){
        res.send({"status": true , "data": "Service enregistré"});
    }
    else{
        res.send({"status": true , "data": "Service déjà existant"});
    }
};

var update_fn=async (req,res)=>{
    let check= await service_serv.update_service(req.body.id,req.body.data);

    if(check){
        res.send({"status": true , "data": "Service modifié avec succès"});
    }
    else{
        res.send({"status": true , "data": "Service déjà existant"});
    }
};

module.exports={listefn,save_fn,update_fn};
