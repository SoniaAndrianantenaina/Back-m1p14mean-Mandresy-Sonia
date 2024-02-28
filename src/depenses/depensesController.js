var depense_service=require('./depensesService');
var liste_by_type_fn=async(req,res)=>{
    // console.log(req.body);
    try{
        let liste= await depense_service.liste_by_type(req.params.type,req.params.mois,req.params.annee);
        res.send({status: true, data: liste})
    }
    catch(err){
        console.log(err);
        res.send({status:false})
    }
}

var save_fn=async(req,res)=>{
    // console.log(req.body);
    try{
        await depense_service.save(req.body.type_depense,req.body.depense);
        res.send({status: true});
    }
    catch(err){
        console.log(err);
        res.send({status:false})
    }
}

var liste_fn=async(req,res)=>{
    try{
        let liste= await depense_service.liste();
        res.send({status: true, data: liste})
    }
    catch(err){
        console.log(err);
        res.send({status:false})
    }
}

var supprimer_fn=async(req,res)=>{
    try{
        await depense_service.supprimer(req.params.id);
        res.send({status: true})
    }
    catch(err){
        res.send({status:false})
    }
}

module.exports={liste_by_type_fn,save_fn,liste_fn,supprimer_fn}