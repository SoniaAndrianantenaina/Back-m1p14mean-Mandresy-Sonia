var type_service=require('./typeDepenseService');
var liste_fn=async(req,res)=>{
    try{
        let liste=await type_service.liste();
        res.send({status:true, data:liste});
    }
    catch(err){
        res.send({status:false});
    }
}

module.exports={liste_fn}