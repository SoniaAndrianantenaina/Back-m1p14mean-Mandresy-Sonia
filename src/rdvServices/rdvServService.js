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

var filtre_by_date_rdv = (liste) => {
  var val = [];
  for (let i = 0; i < liste.length; i++) {
    if (liste[i].rdv != null) {
      val.push(liste[i]);
    }
  }
  return val;
};

var planing_by_emp_by_date = async (id_emp, date) => {
  try {
    let planning = await rdvServModel
      .find({ employe: id_emp })
      .populate("employe")
      .populate({ path: "service", match: {} })
      .populate({
        path: "rdv",
        match: { dateRDV: date },
        populate: {
          path: "client",
        },
      });
    return filtre_by_date_rdv(planning);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = { ajoutRDVServices, planing_by_emp_by_date, listeServRDV };
