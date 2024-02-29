const clientModel = require("../client/clientModel");
var rdvModel = require("./rdvModel");

async function priseRDV(clientId, date_priseRDV, dateRDV, paye, montant_Total,montant_a_paye) {
  try {
    const client = await clientModel.findById(clientId);

    if (!client) {
      throw new Error("Client non trouvé");
    }

    const nouvellePriseRDV = new rdvModel({
      client,
      date_priseRDV,
      dateRDV,
      paye,
      montant_Total,
      montant_a_paye
    });
    const nouveauRdv = await nouvellePriseRDV.save();
    if (nouveauRdv) {
      return nouveauRdv._id;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de la prise de RDV :", error);
    throw error;
  }
}

async function listerRDV(clientId) {
  try {
    const priseRdvs = await rdvModel
      .find({ client: clientId })
      .populate("client");
    return priseRdvs;
  } catch (error) {
    console.error("erreur recup liste RDV Client :", error);
    throw error;
  }
}

var filtre_mois_annee=(liste,mois,annee)=>{
  let val=[];
  for(let i=0;i<liste.length;i++) {
    liste[i].dateRDV.setHours(liste[i].dateRDV.getHours()+3)
    if(liste[i].dateRDV.getMonth()+1 == mois && liste[i].dateRDV.getFullYear()==annee){
      val.push(liste[i]);
    }
  }
  return val;
}

var filtre_mois=(liste,mois)=>{
  let val=[];
  for(let i=0;i<liste.length;i++) {
    liste[i].dateRDV.setHours(liste[i].dateRDV.getHours()+3)
    if(liste[i].dateRDV.getMonth()+1 == mois){
      val.push(liste[i]);
    }
  }
  return val;
}

var filtre_annee=(liste,annee)=>{
  let val=[];
  for(let i=0;i<liste.length;i++) {
    liste[i].dateRDV.setHours(liste[i].dateRDV.getHours()+3)
    if(liste[i].dateRDV.getFullYear()==annee){
      val.push(liste[i]);
    }
  }
  return val;
}


var get_rdv_by_mois_annee = async(mois,annee)=>{
  let liste_rdv=[];
  try{
    let liste=await rdvModel.find({});

    if(mois!=-1 && annee!=0){
      liste_rdv=filtre_mois_annee(liste,mois,annee)
    }

    else if(mois!=-1 && annee==0){
      liste_rdv=filtre_mois(liste,mois)
    }

    else if(mois==-1 && annee!=0){
      liste_rdv=filtre_annee(liste,annee)
    }
    else if(mois==-1 && annee==0){
      liste_rdv=liste;
    }
    return liste_rdv;
  }

  catch(e){
    throw e;
  }
}

var get_rdv_dans_1J=(liste,date)=>{
  console.log(date);
  let val=[];
  for(let i=0;i<liste.length;i++){
    console.log(liste[i].dateRDV);
    let diff_h=(liste[i].dateRDV-date)/ (1000 * 60 * 60)
    console.log(diff_h);
    if(diff_h <= 24 ){
      let data={
        "rdv":liste[i],
        "delai":Math.floor(diff_h),
      }
      val.push(data);
    }
  }
  return val;
}

var get_rappel_rdv=async()=>{
  let date=new Date();
  let liste= await rdvModel.find({
    dateRDV:{$gt:date}
  }).populate('client');
  return get_rdv_dans_1J(liste,date);
  
}

module.exports = { priseRDV, listerRDV ,get_rdv_by_mois_annee,get_rappel_rdv};
