var osServModel = require("./osServModel");
var offre_speciale = require("../offreSpeciale/offreSpecialeModel");
var service=require("../services/servicesModel");
var save=async(offre,id_service,pourcentage)=>{
    try{
        let offre_service= new osServModel();

        // offre_service.offre_speciale= await offre_speciale.findById(id_offre);
        offre_service.service=await service.findById(id_service);
        offre_service.offre_speciale=offre;
        offre_service.pourcentage=pourcentage;
     
        await offre_service.save();
    }
    catch(err){
        throw err;
    }
  
}

module.exports={save}