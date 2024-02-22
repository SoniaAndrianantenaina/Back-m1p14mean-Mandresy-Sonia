var service = require('./offreSpecialeService');
var save_fn=async(req,res)=>{
    try{
        await service.save(req.body.offre,req.body.services);
        return res.send({"status": "true","data":"Offre enregistrée"});
    }

    catch(err){
        console.error(err);
        return res.send({"status": "false","data":"Echec de l'enregistrement"})
    }
}

module.exports={save_fn: save_fn}