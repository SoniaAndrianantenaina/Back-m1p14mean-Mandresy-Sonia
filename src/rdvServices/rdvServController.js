const rdvServServices = require("./rdvServService");

var ajoutServicesPriseRDV = async (req, res) => {
  try {
    const { rdv, service, employe, heure, fait } = req.body;
    const rdvServAjoutee = await rdvServServices.ajoutRDVServices(
      rdv,
      service,
      employe,
      heure,
      fait
    );
    res.status(201).json(rdvServAjoutee);
  } catch (error) {
    console.error(
      "Erreur lors de l'ajout des details de la prise de RDV :",
      error
    );
    res.status(500).json({
      message: "Erreur lors de l'ajout des details de la prise de RDV",
    });
  }
};

var planning_emp_fn=async(req,res)=>{
  try{
    let planning=await rdvServServices.planing_by_emp_by_date(req.params.id,req.params.date);
    res.send({"status":true,"data":planning});
  }
  catch (error) {
    console.error(error);
    res.send({"status":false,"data":null});
  }
}
module.exports = {ajoutServicesPriseRDV,planning_emp_fn};
