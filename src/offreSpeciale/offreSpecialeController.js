var service = require('./offreSpecialeService');
var save_fn=async(req,res)=>{
    try{
        await service.save(req.body.offre,req.body.services);
        return res.send({"status": true,"data":"Offre enregistrée"});
    }

    catch(err){
        console.error(err);
        return res.send({"status": false,"data":"Echec de l'enregistrement"})
    }
}

var liste_fn=async(req,res)=>{
    try{
       let liste= await service.liste();
        return res.send({"status": true,"data":liste});
    }
    catch(err){
        console.error(err);
        return res.send({"status": false,"data":"Erreur"})
    }
}

var delete_offre_fn=async(req,res)=>{
    try{
        await service.delete_offre(req.params.id_offre);
        return res.send({"status": true});
    }
    catch(err){
        console.error(err);
        return res.send({"status": false});
    }
}

module.exports={save_fn: save_fn,liste_fn,delete_offre_fn}