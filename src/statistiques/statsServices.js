var rdvModel = require("../rendezVous/rdvModel");
var rdvServ = require("../rdvServices/rdvServModel");
var rdvServService = require("../rdvServices/rdvServService");
var empl = require("../employes/employeModel");

function convertirEnDate(tempsString) {
  var tempsSplit = tempsString.split(":");
  var heure = parseInt(tempsSplit[0]);
  var minute = parseInt(tempsSplit[1]);
  return new Date(0, 0, 0, heure, minute);
}
async function tempsMoyenTravail() {
  var tempsTotalParEmploye = [];

  var emplTemps = await empl.find({});
  emplTemps.forEach((temps) => {
    //nbre total heure travaillees
    var heureDebut = convertirEnDate(temps.h_debut);
    var heureFin = convertirEnDate(temps.h_fin);
    var difference = heureFin - heureDebut;

    var tempsTotalEnHeures = ((difference / (1000 * 60 * 60)) * 6 * 52) / 12;
    let data = {
      nom: temps.nom,
      prenom: temps.prenom,
      tempsTotal: tempsTotalEnHeures,
    };
    tempsTotalParEmploye.push(data);
  });
  return tempsTotalParEmploye;
}

async function nbRDVJourMois() {
  var rdvs = await rdvModel.find({});
  var rdvsCount = [];

  var dateAujourdhui = new Date();
  var moisEnCours = dateAujourdhui.getMonth();

  var totalRdvMois = 0;
  var totalRdvJour = 0;

  rdvs.forEach((rdv) => {
    var dateRDVS = new Date(rdv.dateRDV);
    var moisRDVS = dateRDVS.getMonth();

    if (
      dateRDVS.toISOString().split("T")[0] ===
      dateAujourdhui.toISOString().split("T")[0]
    ) {
      totalRdvJour += Object.keys(rdv._id).length - 1;
    }

    if (moisEnCours === moisRDVS) {
      totalRdvMois += Object.keys(rdv._id).length - 1;
    }
  });

  rdvsCount.push({ NombreRDVJour: totalRdvJour });
  rdvsCount.push({ NombreRDVMois: totalRdvMois });

  return rdvsCount;
}

async function getCA() {
  var rdvs = await rdvModel.find({});
  var CA = [];

  var dateAujourdhui = new Date();
  var moisEnCours = dateAujourdhui.getMonth();

  var CAJour = 0;
  var CAMois = 0;

  rdvs.forEach((rdv) => {
    var dateRDVS = new Date(rdv.dateRDV);
    var moisRDVS = dateRDVS.getMonth();
    if (
      dateRDVS.toISOString().split("T")[0] ===
        dateAujourdhui.toISOString().split("T")[0] &&
      rdv.paye == true
    ) {
      if (rdv.montant_a_paye && rdv.montant_a_paye != 0) {
        CAJour += rdv.montant_a_paye;
      } else {
        CAJour += rdv.montant_Total;
      }
    }

    if (moisEnCours === moisRDVS && rdv.paye == true) {
      if (rdv.montant_a_paye && rdv.montant_a_paye != 0) {
        CAMois += rdv.montant_a_paye;
      } else {
        CAMois += rdv.montant_Total;
      }
    }
  });

  CA.push({ CAJour: CAJour });
  CA.push({ CAMois: CAMois });
  //   console.log(CA);
  return CA;
}

module.exports = { tempsMoyenTravail, nbRDVJourMois, getCA };
