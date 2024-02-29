const rdvServModel = require("./rdvServModel");
const rdvModel = require("../rendezVous/rdvModel");
const serviceModel = require("../services/servicesModel");
const employeModel = require("../employes/employeModel");

async function ajoutRDVServices(
  rdvId,
  serviceId,
  employeId,
  heure_debut,
  heure_fin,
  fait
) {
  try {
    const rdv = await rdvModel.findById(rdvId);
    const service = await serviceModel.findById(serviceId);
    const employe = await employeModel.findById(employeId);

    const nouvelAjout = new rdvServModel({
      rdv,
      service,
      employe,
      heure_debut,
      heure_fin,
      fait,
    });

    return await nouvelAjout.save();
  } catch (error) {
    console.error(
      "Erreur lors de l'ajout des details la prise de RDV :",
      error
    );
    throw error;
  }
}

async function listeServRDV(rdvId) {
  try {
    const detailServRDV = await rdvServModel
      .find({ rdv: rdvId })
      .populate("rdv")
      .populate("service")
      .populate("employe");
    return detailServRDV;
  } catch (error) {
    console.error("erreur recup liste services RDV Client :", error);
    throw error;
  }
}

var filtre_by_date_rdv = (liste,date) => {
  var val = [];
  let commissionT=0;
  let datefiltre=date;
  // console.log( "date filtre :"+datefiltre)
  for (let i = 0; i < liste.length; i++) {
    // console.log(liste[i].rdv.dateRDV);
    let dateComplete = liste[i].rdv.dateRDV;
    let annee = dateComplete.getFullYear();
    let mois = (dateComplete.getMonth() + 1).toString().padStart(2, '0');
    let jour = dateComplete.getDate().toString().padStart(2, '0');
    let datePartielle = `${annee}-${mois}-${jour}`;

    let dateRDV=new Date(datePartielle);
    // console.log("dateRDV :"+dateRDV);
    // console.log(datefiltre.getTime()==dateRDV.getTime())

    if (datefiltre.getTime() == dateRDV.getTime()) {
      val.push(liste[i]);
      if (liste[i].fait) {
        commissionT =
          commissionT +
          (liste[i].service.prix * liste[i].service.commission) / 100; // commission total
      }
    }
  }
  let data = {
    rdv: val,
    commissionTotal: commissionT,
  };
  return data;
};

var planing_by_emp_by_date = async (id_emp, date) => {
  try {
    let date_utc=new Date(date);
    // date_utc.setUTCHours(date_utc.getUTCHours()-3);
    
    let planning = await rdvServModel
      .find({ employe: id_emp })
      .sort({ heure_fin: 1 })
      .populate("employe")
      .populate({ path: "service", match: {} })
      .populate({
        path: "rdv",
        // match: { dateRDV: date_utc },
        populate: {
          path: "client",
        },
      });
    return filtre_by_date_rdv(planning,date_utc);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

var check = async (id_serv, etat) => {
  if (etat) {
    etat = false;
  } else {
    etat = true;
  }
  try {
    let data = {
      fait: etat,
    };
    await rdvServModel.findByIdAndUpdate(id_serv, data);
  } catch (e) {
    throw e;
  }
};

var historique=async(date,service,employe)=>{
    let liste;
    let date_utc=new Date(date);
    // date_utc.setUTCHours(date_utc.getUTCHours()-3);
    // console.log('date'+date_utc);
    try{
    if(service!='' && employe!='' && date!='') {
      liste = await rdvServModel.find({service:service,employe:employe})
      .populate('service')
      .populate('employe')
      .populate({
        path: "rdv",
        // match: { dateRDV: date_utc },
        populate: {
          path: "client",
        },
      });
      return filtre_by_date_rdv(liste,date_utc);
    }
    else if(service!='' && employe=='' && date!=''){
      liste = await rdvServModel.find({service:service})
      .populate('service')
      .populate('employe')
      .populate({
        path: "rdv",
        // match: { dateRDV: date_utc },
        populate: {
          path: "client",
        },
      });
      return filtre_by_date_rdv(liste,date_utc);
    }
    else if(service=='' && employe!='' && date!=''){
      liste = await rdvServModel.find({employe:employe})
      .populate('service')
      .populate('employe')
      .populate({
        path: "rdv",
        // match: { dateRDV: date_utc },
        populate: {
          path: "client",
        },
      });
      return filtre_by_date_rdv(liste,date_utc);
    }
    else if(service=='' && employe=='' && date!=''){
      liste = await rdvServModel.find({})
      .populate('service')
      .populate('employe')
      .populate({
        path: "rdv",
        // match: { dateRDV: date_utc },
        populate: {
          path: "client",
        },
      });
      return filtre_by_date_rdv(liste,date_utc);
    }
  }
  catch(e) {
    throw e;
  }
}

module.exports = {
  ajoutRDVServices,
  planing_by_emp_by_date,
  check,
  listeServRDV,
  historique
};
