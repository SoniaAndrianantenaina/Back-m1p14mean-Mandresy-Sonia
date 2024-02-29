const db_name = "coiffure";
const db_url = "mongodb://127.0.0.1:27017/";
const use_https = false; // https ou http utile pour la config de la session
const mail_config = {
  user: "andriantsiorymandresy0@gmail.com",
  mdp: "fzxx kgxs yigu mucp",
};

const heure_envoie_notif = "10 9 * * *"; // min h j mois annee
const img_notif_url =
  "https://img.freepik.com/premium-vector/beauty-salon-logo-template_22857-6.jpg";
module.exports = {
  db_name,
  db_url,
  use_https,
  mail_config,
  heure_envoie_notif,
  img_notif_url,
};
