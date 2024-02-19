const clientModel = require("../client/clientModel");
var rdvModel = require("./rdvModel");


async function priseRDV(clientId, date_priseRDV, dateRDV, paye, montant_Total) {
  try {
    const client = await clientModel.findById(clientId);

    if (!client) {
      throw new Error("Client non trouvé");
    }

    const nouvellePriseRDV = new rdvModel({
      client,
      date_priseRDV,
      dateRDV,
      paye,
      montant_Total,
    });

    return await nouvellePriseRDV.save();
  } catch (error) {
    console.error("Erreur lors de l'ajout de la prise de RDV :", error);
    throw error;
  }
}

var liste=async()=>{
    let liste= await rdvModel.find({});
    return liste;
}

module.exports = { priseRDV };

