const preferencesService = require("./preferencesService");

module.exports.ajoutPref = async (req, res) => {
  const { clientId, serviceId, employeId } = req.body;
  if (clientId && serviceId && employeId) {
    let status = await preferencesService.ajouterPreferences(
      clientId,
      serviceId,
      employeId
    );

    if (status) {
      res.status(201).json({ status: true, data: "Préference enregistrée!" });
    } else {
      res.status(400).json({
        status: false,
        data: "Erreur lors de l'enregistrement de la préférence.",
      });
    }
  } else {
    res.status(400).json({
      status: false,
      data: "Les champs clientId, serviceId et employeId sont requis.",
    });
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

module.exports.deletePref = async (req, res) => {
  try {
    const prefId = req.params.prefId;
    await preferencesService.deletePref(prefId);
    res.send({ status: true, data: "Votre préférence a bien été supprimée" });
  } catch (error) {
    res.send({ status: false, data: "Votre préférence n'a pas été supprimée" });
  }
};
