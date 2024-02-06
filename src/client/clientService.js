var clientModel = require("./clientModel");
const bcrypt = require("./bcrypt");

module.exports.inscriptionClientService = async (clientDetails) => {
  try {
    mdpHashe = await bcrypt.hash(clientDetails.mdp, 10);

    const clientModelData = new clientModel({
      nom: clientDetails.nom,
      prenom: clientDetails.prenom,
      email: clientDetails.email,
      mdp: mdpHashe,
      contact: clientDetails.contact,
    });

    return await clientModelData.save();
  } catch (error) {
    console.error(
      "Erreur lors de la création de l'utilisateur dans la base de données :",
      error
    );
    throw error;
  }
};
