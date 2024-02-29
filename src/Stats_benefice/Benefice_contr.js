var benefice_serv=require('./Benefice_service');
var benefice_fn=async(req,res)=>{
    try{
        let montant=await benefice_serv.get_benefice(req.params.mois,req.params.annee);
        res.send({status:true,data:montant});
    }
    catch(e){
        res.send({status:false})
    }
}
module.exports={benefice_fn}