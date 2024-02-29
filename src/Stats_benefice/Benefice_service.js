var rdv_service=require('../rendezVous/rdvService');
var depense_service=require('../depenses/depensesService');

var get_total_rdv=(liste_rdv)=>{
    let montant=0;
    for(var i=0; i<liste_rdv.length;i++){
        montant=montant+liste_rdv[i].montant_a_paye;
    }
    return montant;
}

var get_total_depense=(liste_depense)=>{
    let montant=0;
    for(var i=0; i<liste_depense.length;i++){
        montant=montant+liste_depense[i].montant;
    }
    return montant;
}

var get_benefice=async(mois,annee)=>{ 
    let montant = 0;
    let liste_depense = [];
    let liste_rdv=[];
    try{
        liste_depense=await depense_service.liste_by_type('tous',mois,annee);
        liste_rdv=await rdv_service.get_rdv_by_mois_annee(mois,annee);
        let PR=get_total_rdv(liste_rdv);
        let depense=get_total_depense(liste_depense);
        console.log("PR"+PR)
        console.log("depense"+depense)
        montant=PR-depense;
    }
    catch(err){
        throw err;
    }
    return montant
}

module.exports={get_benefice};