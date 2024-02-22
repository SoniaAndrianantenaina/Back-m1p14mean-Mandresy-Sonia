const preferencesService = require("./preferencesService");

module.exports.ajoutPref = async (req, res) => {
  try {
    const { clientId, serviceId, employeId } = req.body;
    if (clientId && serviceId && employeId) {
      const preferenceAjoutee = await preferencesService.ajouterPreferences(
        clientId,
        serviceId,
        employeId
      );
      res.status(201).json(preferenceAjoutee);
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de la préférence :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout de la préférence" });
  }
};

module.exports.listePref = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const listPref = await preferencesService.listerPreferences(clientId);
    res.status(201).json(listPref);
  } catch (error) {
    console.error("erreur liste preferences client:", error);
    res.status(500).json({ message: "erreur liste" });
  }
};
