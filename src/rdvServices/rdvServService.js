const rdvServModel = require("./rdvServModel");
const rdvModel = require("../rendezVous/rdvModel");
const serviceModel = require("../services/servicesModel");
const employeModel = require("../employes/employeModel");

async function ajoutRDVServices(rdvId, serviceId, employeId, heure, fait) {
  try {
    const rdv = await rdvModel.findById(rdvId);
    const service = await serviceModel.findById(serviceId);
    const employe = await employeModel.findById(employeId);

    const nouvelAjout = new rdvServModel({
      rdv,
      service,
      employe,
      heure,
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

module.exports = { ajoutRDVServices };
