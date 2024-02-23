const rdvServServices = require("./rdvServService");

var ajoutServicesPriseRDV = async (req, res) => {
  try {
    const { rdv, service, employe, heure_debut, heure_fin, fait } = req.body;
    const rdvServAjoutee = await rdvServServices.ajoutRDVServices(
      rdv,
      service,
      employe,
      heure_debut,
      heure_fin,
      fait
    );
    res.status(201).json(rdvServAjoutee);
  } catch (error) {
    console.error(
      "Erreur lors de l'ajout des details de la prise de RDV :",
      error
    );
    res.status(500).json({
      message: "Erreur lors de l'ajout des details de la prise de RDV",
    });
  }
};

var listeServicesPriseRDV = async (req, res) => {
  try {
    const rdvId = req.params.rdvId;
    const listeServRDV = await rdvServServices.listeServRDV(rdvId);
    res.status(201).json(listeServRDV);
  } catch (error) {
    console.error("erreur liste services prise RDV:", error);
    res.status(500).json({ message: "erreur liste" });
  }
};

var planning_emp_fn = async (req, res) => {
  try {
    let planning = await rdvServServices.planing_by_emp_by_date(
      req.params.id,
      req.params.date
    );
    res.send({ status: true, data: planning });
  } catch (error) {
    console.error(error);
    res.send({ status: false, data: null });
  }
};

var check_fn = async (req, res) => {
  try {
    await rdvServServices.check(req.body.id_serv, req.body.etat);
    res.send({ status: true });
  } catch (error) {
    console.error(error);
  }
};
module.exports = {
  ajoutServicesPriseRDV,
  planning_emp_fn,
  check_fn,
  listeServicesPriseRDV,
};
