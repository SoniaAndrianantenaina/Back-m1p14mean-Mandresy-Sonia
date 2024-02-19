const rdvServServices = require("./rdvServService");

module.exports.ajoutServicesPriseRDV = async (req, res) => {
  try {
    const { rdv, service, employe, heure, fait } = req.body;
    const rdvServAjoutee = await rdvServServices.ajoutRDVServices(
      rdv,
      service,
      employe,
      heure,
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
