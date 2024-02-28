var depensesModel = require("./depensesModel");
var type_depensesModel = require("../typeDepense/typeDepenseModel");

var filtre_by_mois=(mois,liste)=>{
    let val=[];
    for(let i=0;i<liste.length;i++){
        // let date=new Date(liste[i].date);
        // console.log(liste[i].date.getMonth())
        if(liste[i].date.getMonth()+1==mois){
            val.push(liste[i]);
        }
    }
    return val;
}
var filtre_by_annee=(annee,liste)=>{
    let val=[];
    for(let i=0;i<liste.length;i++){
        // let date=new Date(liste[i].date);
        if(liste[i].date.getFullYear()==annee){
            val.push(liste[i]);
        }
    }
    return val;
}

var filtre_by_mois_annee=(mois,annee,liste)=>{
    let val=[];
    for(let i=0;i<liste.length;i++){
        // let date=new Date(liste[i].date);
        if(liste[i].date.getMonth()+1==mois && liste[i].date.getFullYear()==annee){
            val.push(liste[i]);
        }
    }
    return val;
}

var liste_by_type=async(type,mois,annee)=>{
    try {
        let liste;
        let val=[];
        if(type!='tous'){
            liste=await depensesModel.find({service:type}).populate('service')
        }
        else{
            liste=await depensesModel.find({}).populate("service");
        }

        if(mois!=-1 && annee!=0){
            val=filtre_by_mois_annee(mois,annee,liste)
        }

        else if(mois==-1 && annee!=0){
            val=filtre_by_annee(annee,liste)
        }
        else if(mois!=-1 && annee==0){
            val=filtre_by_mois(mois,liste)
        }
        else if(mois==-1 && annee==0){
            val=liste;
        }
        return val;
    }
    catch(e){
        throw e;
    }
}

// save
var save=async(id_type_depense,depense)=>{

    try{
        let type = await type_depensesModel.findById(id_type_depense);
        let new_depense = new depensesModel(depense);
        new_depense.service=type;
    
        await new_depense.save();
    }

    catch(e){
        throw e;
    }


}

var liste=async()=>{
    try{
        return await depensesModel.find({}).populate("service");
    }
    catch(e){
        throw e;
    }
}

var supprimer=async(depense)=>{
    try{
        await depensesModel.findByIdAndRemove(depense)
    }
    catch(e){
        throw e;
    }
}
module.exports={liste_by_type,save,liste,supprimer};