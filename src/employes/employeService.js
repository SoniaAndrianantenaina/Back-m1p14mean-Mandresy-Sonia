var employe = require("./employeModel");
const bcrypt = require("bcrypt");
var saveemp=async(newemp)=>{
    var emp=new employe();
        emp.nom=newemp.nom;
        emp.prenom=newemp.prenom;
        emp.email=newemp.email;
        emp.mdp=await bcrypt.hash(newemp.mdp,10);
        emp.h_debut=newemp.h_debut;
        emp.h_fin=newemp.h_fin;
    try{
        await emp.save();
        return true;
    }
    catch(error){
        console.error('Erreur:',error);
        return false;
    }
}

module.exports={saveemp};