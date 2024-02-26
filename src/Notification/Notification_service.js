var notif_modele=require('./Notification_model');
var save_and_planifier=async(offre_speciale)=>{
    let tableau=planifier(offre_speciale);

    // console.log(tableau);
    for (let i=0; i<tableau.length; i++){
        let notif=new notif_modele(tableau[i]);
        try{
            await notif.save();
        }
        catch(e){
            throw e;
        }
    }
}
var planifier=(offre_speciale)=>{
    const date_d=new Date(offre_speciale.date_debut);
    const date_f=new Date(offre_speciale.date_fin);
    console.log(date_d<=date_f)
    let liste=[];
    while(date_d<=date_f){
        let notif={
            "offre_speciale":offre_speciale,
            "date_envoie":new Date(date_d)
        }
        liste.push(notif);
        // console.log("notif"+notif)
        date_d.setDate(date_d.getDate()+1);
    }
    return liste;
}

var get_notif_today=async()=>{
    const dateActuelle = new Date();

// Extraire l'année, le mois et le jour de la date actuelle
const annee = dateActuelle.getFullYear();
const mois = dateActuelle.getMonth() + 1; // Les mois commencent à 0, donc nous ajoutons 1
const jour = dateActuelle.getDate();

// Construire la date sans l'heure
const dateSansHeure = new Date(annee, mois - 1, jour); // Soustrayez 1 du mois car les mois sont indexés à partir de 0

let liste= await notif_modele.find({"date_envoie":dateSansHeure}).populate('offre_speciale');
console.log(liste);
    return liste;
}

module.exports={save_and_planifier,get_notif_today}