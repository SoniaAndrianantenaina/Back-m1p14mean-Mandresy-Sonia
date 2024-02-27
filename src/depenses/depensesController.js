var depense_service=require('./depensesService');
var liste_by_type_fn=async(req,res)=>{
    try{
        let liste= await depense_service.liste_by_type(req.body.type);
        res.send({status: true, data: liste})
    }
    catch(err){
        console.log(err);
        res.send({status:false})
    }
}