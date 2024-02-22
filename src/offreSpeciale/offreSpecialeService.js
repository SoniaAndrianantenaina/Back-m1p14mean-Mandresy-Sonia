var offreSpecialeModel = require("./offreSpecialeModel");
var offre_spec_serv=require("../OS_Services/osServService");
const mongoose = require('mongoose');
var save=async(data,services)=>{
    let os=new offreSpecialeModel();
    os.nom=data.nom;
    os.description=data.description;
    os.date_debut=data.date_debut;
    os.date_fin=data.date_fin;
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        try{
            let new_OS=await os.save();
            for(let i=0; i<services.length; i++){
               await offre_spec_serv.save(new_OS,services[i].service._id,services[i].reduction);
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

module.exports={save}