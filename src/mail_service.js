const nodemailer = require('nodemailer');
const config=require('../Config.js');
const fs=require('fs');

// Paramètres du transporteur SMTP
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Service de messagerie à utiliser (vous pouvez également utiliser 'SMTP')
    auth: {
        user: config.mail_config.user, 
        pass: config.mail_config.mdp 
    }
});


var envoieMail=async (mail,mdp,nouveau_compte)=>{
    let message='Votre compte a été créer avec succès.';
    let sujet='Nouveau compte';
    if(!nouveau_compte){
        message = 'Réinitialisation du mot de passe avec succès.';
        sujet = 'Récupération de compte';
    }
    

    fs.readFile('Views/mail.html', 'utf8', function (err, contenu_mail) {
        if (err) {
            console.error('Erreur de lecture du fichier HTML:', err);
        }
        const contenu_mai =contenu_mail.replace('{{sujet}}', sujet).replace('{{message}}',message).replace('{{code}}',mdp).replace('{{sujet}}',sujet);
    
    const mailOptions = {
        from: config.mail_config.user, 
        to: mail, 
        subject: sujet, 
        html: contenu_mai
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('E-mail envoyé: ' + info.response);
        }
    });
   
})
}

module.exports={envoieMail};
