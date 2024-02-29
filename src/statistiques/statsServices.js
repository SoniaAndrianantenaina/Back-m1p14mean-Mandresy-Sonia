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

  rdvs.forEach((rdv) => {});
  return rdvs;
}

module.exports = { tempsMoyenTravail, nbRDVJourMois };
