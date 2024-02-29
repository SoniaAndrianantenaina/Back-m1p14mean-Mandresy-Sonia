const cron = require('node-cron');
const admin = require('firebase-admin');
const client_serv=require('./client/clientService');
const Notification_service=require('./Notification/Notification_service');
const rdv_service=require('./rendezVous/rdvService')

var serviceAccount = require("../coiffure-b3071-firebase-adminsdk-7npxr-21b61a76af.json");
const config=require("../Config")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function sendNotif(){

  try{
    var liste_client = await client_serv.liste();
    var liste_notif= await Notification_service.get_notif_today();
  }
  catch(e){ 
    console.error(e);
  }
  console.log(liste_client);
  for(let i=0; i<liste_client.length; i++){
    for(let j=0; j<liste_notif.length; j++){
      
      const message = {
        notification: {
          title: liste_notif[j].offre_speciale.nom,
          body: liste_notif[j].offre_speciale.description,
          image:config.img_notif_url
        },
        token: liste_client[i].token_appareil,
      };
    
      admin.messaging().send(message)
      .then((response) => {
        console.log('Notification envoyée avec succès :', response);
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi de la notification :', error);
      });
  
    }

  }

 
}

async function send_rappel(){
  let liste_rappel=await rdv_service.get_rappel_rdv();
  for(let i=0;i<liste_rappel.length;i++){
    const message = {
      notification: {
        title: 'Rappel de rendez-vous',
        body: 'Votre rendez-vous est dans '+liste_rappel[i].delai +'heures',
        image:config.img_notif_url
      },
      token: liste_rappel[i].rdv.client.token_appareil,
      
    };
    // console.log(liste_rappel[i].rdv.client.token_appareil)
  
    admin.messaging().send(message)
    .then((response) => {
      console.log('Notification envoyée avec succès :', response);
    })
    .catch((error) => {
      console.error('Erreur lors de l\'envoi de la notification :', error);
    });
  }
}

cron.schedule(config.heure_envoie_notif, () => {

  sendNotif();
  send_rappel();
});

module.exports = cron;