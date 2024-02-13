var clientModel = require("./clientModel");
const bcrypt = require("bcrypt");

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

module.exports.login = async (clientDetails) => {
  const { email, mdp } = clientDetails;

  const emailClient = await clientModel.findOne({ email });

  if (emailClient) {
    const mdpVerified = await bcrypt.compare(mdp, emailClient.mdp);

    if (mdpVerified) {
      return { status: true, message: "Connecté!", clientId: emailClient._id }; // Mot de passe correct, renvoie l'ID du client
    } else {
      return { status: false, message: "Mot de passe incorrect" };
    }
  } else {
    return { status: false, message: "Adresse email incorrecte" };
  }
};
