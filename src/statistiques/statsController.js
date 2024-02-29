var statsServ = require("./statsServices");

var tempsMoyenTravailEmpl = async (req, res) => {
  try {
    const temps = await statsServ.tempsMoyenTravail();
    res.status(201).json(temps);
  } catch (error) {
    console.error("erreur stats:", error);
    res.status(500).json({ message: "erreur liste" });
  }
};

var nbRDVStat = async (req, res) => {
  try {
    const nbrdv = await statsServ.nbRDVJourMois();
    res.status(201).json(nbrdv);
  } catch (error) {
    console.error("erreur stats RDV:", error);
    res.status(500).json({ message: "erreur liste" });
  }
};

module.exports = {
  tempsMoyenTravailEmpl,
  nbRDVStat,
};
