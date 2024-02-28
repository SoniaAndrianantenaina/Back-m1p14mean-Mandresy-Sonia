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

var get_services_by_offre=async(offre)=>{
    try{
        let services= await osServModel.find({offre_speciale:offre}).populate("service");
        return services;
    }
    catch(err){
        throw err;
    }
}

var delete_serv_offre=async(id_offre)=>{
    try{
        await osServModel.deleteMany({offre_speciale:id_offre});
    }
    catch(err){
        throw err;
    }
}

var get_offre_service_dujour=async(date)=>{
    let val=[];
    let dateUTC= new Date(date);
    let dateLocal= new Date(dateUTC.getFullYear(), dateUTC.getMonth(), dateUTC.getDate());
    // console.log(dateLocal)
    try{
        let liste=await osServModel.find({}).populate("service").populate("offre_speciale");
        if(liste){
            for(let i=0; i<liste.length; i++){
                // console.log(liste[i].offre_speciale.date_debut)
                if(dateLocal>= (liste[i].offre_speciale.date_debut) && dateLocal <= (liste[i].offre_speciale.date_fin)){
                    val.push(liste[i]);
                }
            }
        }
        return val;
    }
    catch(e){
        throw e;
    }
}

module.exports={save,get_services_by_offre,delete_serv_offre,get_offre_service_dujour}