var offreSpecialeModel = require("./offreSpecialeModel");
var offre_spec_serv=require("../OS_Services/osServService");
var offre_spec_serv_model = require("../OS_Services/osServModel")
const mongoose = require('mongoose');
var save=async(data,services)=>{
    // let os=new offreSpecialeModel();
    // os.nom=data.nom;
    // os.description=data.description;
    // os.date_debut=data.date_debut;
    // os.date_fin=data.date_fin;
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        try{
            let os;
            console.log(data)
            if(data._id!=''){
                let id=data._id;
                let data2=data;
                delete data2._id;
                os=await offreSpecialeModel.findByIdAndUpdate(id,data2);
                await offre_spec_serv_model.deleteMany({offre_speciale:id});
            }
            else{
                delete data._id;
                os = new offreSpecialeModel(data);
                os = await os.save();
            }
            console.log(os);
            for(let i=0; i<services.length; i++){
               await offre_spec_serv.save(os,services[i].service._id,services[i].reduction);
            }
            await session.commitTransaction();
            session.endSession();
    
            console.log("Transaction réussie !");
        }
        catch(err){
            await session.abortTransaction();
            session.endSession();
            
            console.error("Erreur lors de la transaction :", err);
            throw err; 
        }
        
    }
    catch(e){
        throw e;
    }
}

var liste=async()=>{
    let liste_offre = await offreSpecialeModel.find({});
    let liste_offres_services=[];
    for(let i=0; i<liste_offre.length;i++){
        try{
            let servs= await offre_spec_serv.get_services_by_offre(liste_offre[i]);
            let data={
                "offre":liste_offre[i],
                "services":servs
            }
            liste_offres_services.push(data);
        }
        catch(e){
            throw e;
        }
    }
    return liste_offres_services;
}

var delete_offre =async(id)=>{
    try{
        await offreSpecialeModel.findByIdAndDelete(id);
        await offre_spec_serv.delete_serv_offre(id);
    }
    catch(e){
        throw e;
    }
}

module.exports={save,liste,delete_offre}