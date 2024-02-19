const rdvService = require("./rdvService");

module.exports.ajoutPriseRDV = async (req, res) => {
  try {
    const { client, date_priseRDV, dateRDV, paye, montant_Total } = req.body;
    const rdvAjoutee = await rdvService.priseRDV(
      client,
      date_priseRDV,
      dateRDV,
      paye,
      montant_Total
    );
    res.status(201).json(rdvAjoutee);
  } catch (error) {
    console.error("Erreur lors de l'ajout de la prise de RDV :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout de la prise de RDV" });
  }
};
