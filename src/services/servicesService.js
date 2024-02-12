var servicesModel = require("./servicesModel");
var save_service = async (data)=>{
    let serv=new servicesModel();
    serv.nom=data.nom;
    serv.delai=data.delai;
    serv.prix=data.prix;
    serv.commission=data.commission;

    try{
        await serv.save();
        return true;
    }

    catch(e){
        console.error(e);
        return false;
    }
};
var nom_not_change= async (id,nom)=>{
    if(await servicesModel.findOne({_id:id,nom:nom})){
        return true;
    }
    else{
        return false;
    }
};

var update_service = async (id,data)=>{
    if(await nom_not_change(id,data.nom)){
        delete data.nom;
    }
    console.log(data)
    try{
        await servicesModel.findByIdAndUpdate(id,data);
        return true;
    }

    catch(e){
        console.error(e);
        return false;
    }
};

var get_all_services = async ()=>{
    try{
        let services= await servicesModel.find();
        return services;
    }

    catch(e){
        console.error(e);
        return false;
    }
};

module.exports = {save_service,update_service,get_all_services};