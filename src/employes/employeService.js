var employe = require("./employeModel");
var mail_serv=require("../mail_service");
const bcrypt = require("bcrypt");
function generatePassword(){
    let mdp='';
    let i=0;
    while(i<6){
        let lettre=Math.round(Math.random());
        if(lettre==0){ 
            mdp=mdp+Math.floor(Math.random()*10);
        }
        else{ 
            let miniscule=Math.round(Math.random());
            if(miniscule==1){
                mdp=mdp+String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97);
            }
            else{
                mdp=mdp+String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65);
            }
        }
        i++;
    }
    return mdp;
}
var saveemp=async(newemp)=>{

    let mdp=generatePassword();
    var emp=new employe();
        emp.nom=newemp.nom;
        emp.prenom=newemp.prenom;
        emp.email=newemp.email;
        emp.mdp=await bcrypt.hash(mdp,10);
        emp.h_debut=newemp.h_debut;
        emp.h_fin=newemp.h_fin;
    try{
        await emp.save();
        await mail_serv.envoieMail(emp.email,mdp,true);
        console.log("mdp :", mdp);
        return true;
    }
    catch(error){
        console.error('Erreur:',error);
        return false;
    }
}

var get_all=async()=>{
    try{
        var employes=await employe.find({});
        return employes;
    }
    catch (error){
        throw new Error('Erreur:',error);
    }
}

var mail_not_change=async(id,email)=>{
   let check=await employe.findOne({_id:id,email:email});
    if(check){
        return true;
    }
    else{
        return false;
    }
} 

var update_emp=async(id,data)=>{
    if(await mail_not_change(id,data.email)){
        delete data.email;
    }
    console.log(data);
    try{
        await employe.findByIdAndUpdate(id,data);
        return true;
    }
    catch (error){
        console.error('Erreur:',error);
        return false;
    }
    
}

var login=async(data)=>{
    let check=await employe.findOne({email:data.email});
    if(check){
        if(await bcrypt.compare(data.mdp,check.mdp)){
            return check._id;
        }
        else{
            return 1;
        }
    }
    else{
        return 0;
    }
}

var get_profil=async(id)=>{
    try{
        let user=await employe.findById(id);
        return user;
    }
    catch(err){
        console.error(err);
    }

}

module.exports={saveemp,get_all,update_emp,login,get_profil};