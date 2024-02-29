const express = require("express");
const router = express.Router();
var managerContre = require("../src/manager/managerController");
var employeeContre = require("../src/employes/employeController");
var clientController = require("../src/client/clientController");
var preferenceController = require("../src/preferences/preferencesController");
var rdvController = require("../src/rendezVous/rdvController");
var rdvServController = require("../src/rdvServices/rdvServController");

var serv_contr = require("../src/services/servicesController");
var gest_token = require("../src/Gestion_token");
var rdvContr = require("../src/rendezVous/rdvController");
const { ajoutRDVServices } = require("../src/rdvServices/rdvServService");

const check_token = (req, res, next) => {
  let check = gest_token.verif_token(req.body.ref);
  if (!check) {
    res.send({ status: false, data: "Session expiré" });
  } else {
    req.body.ref = check;
    next();
  }
};

router.post("/manager/authentification", managerContre.to_logfn);
router.post("/manager/ajout_employe", employeeContre.save_emp_fn);

//clients
router.route("/client/inscription").post(clientController.inscriptionClient);
router.route("/client/login").post(clientController.loginClient);

router.get("/manager/employes", employeeContre.get_all_emp_fn);
router.patch("/manager/employe/update", employeeContre.update_emp_fn);

router.get("/manager/services", serv_contr.listefn);
router.post("/manager/service/save", serv_contr.save_fn);
router.patch("/manager/service/update", serv_contr.update_fn);
router.post("/employe/login", employeeContre.login_fn);
router.post("/employe/profil", check_token, employeeContre.profil_fn);
router.patch("/employe/update", employeeContre.update_emp_fn);
router.patch("/employe/update/mdp", check_token, employeeContre.update_mdp_fn);

//preferences
router.route("/preferences/ajout").post(preferenceController.ajoutPref);
router
  .route("/preferences/liste/:clientId")
  .get(preferenceController.listePref);
router
  .route("/preferences/delete/:prefId")
  .get(preferenceController.deletePref);

//rdv
router
  .route("/client/listeRDVServ")
  .get(rdvServController.listerTousServicesRdv);

router.route("/client/ajoutRDV").post(rdvController.ajoutPriseRDV);
router.route("/client/listeRDV/:clientId").get(rdvController.listePriseRDV);
router
  .route("/client/ajoutServicesRDV")
  .post(rdvServController.ajoutServicesPriseRDV);
router
  .route("/client/listeServRDV/:rdvId")
  .get(rdvServController.listeServicesPriseRDV);

router.get("/employe/planning/:id/:date", rdvServController.planning_emp_fn); // planning emp par rapport a une date
router.patch("/employe/planning/check", rdvServController.check_fn); // cocher et decocher to do

var os_contr = require("../src/offreSpeciale/offreSpecialeController");
const offreSpecialeController = require("../src/offreSpeciale/offreSpecialeController");
router.post("/manager/offreSpecial/save", os_contr.save_fn); // ajout offreSpeciale et update
router.get("/manager/offre_speciales", os_contr.liste_fn); // liste
router.delete(
  "/manager/offre_speciale/:id_offre",
  offreSpecialeController.delete_offre_fn
); // delete

var notif_service = require("../src/Notification/Notification_service");
router.get("/notifs", notif_service.get_notif_today); // liste

router.post("/manager/rdv", rdvServController.historique_fn);

module.exports = router;
