const Preference = require("./preferencesModel");
const Client = require("../client/clientModel");
const Service = require("../services/servicesModel");
const Employe = require("../employes/employeModel");
const preferencesModel = require("./preferencesModel");

async function ajouterPreferences(clientId, serviceId, employeId) {
  try {
    const client = await Client.findById(clientId);
    const service = await Service.findById(serviceId);
    const employe = await Employe.findById(employeId);
    if (!client) {
      throw new Error("Client non trouvé");
    } else if (!service) {
      throw new Error(" service non trouvé");
    } else if (!employe) {
      throw new Error(" employé non trouvé");
    }

    const nouvellePreference = new Preference({
      client,
      service,
      employe,
    });

    return await nouvellePreference.save();
  } catch (error) {
    console.error("Erreur lors de l'ajout de la préférence :", error);
    throw error;
  }
}

async function listerPreferences(clientId) {
  try {
    // console.log(clientId);
    const preferences = await preferencesModel.find({ client: clientId });
    const preferencesWithDetails = [];

    if (preferences) {
      for (const preference of preferences) {
        const client = await Client.findById(preference.client);
        const service = await Service.findById(preference.service);
        const employe = await Employe.findById(preference.employe);

        preferencesWithDetails.push({
          preference,
          client,
          service,
          employe,
        });
      }

      return preferencesWithDetails;
    }
  } catch (error) {
    console.error("erreur liste");
    throw error;
  }
}
module.exports = { ajouterPreferences, listerPreferences };
