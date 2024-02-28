var service = require('./osServService');
var get_offre_today=async(req,res)=>{
    try{
        let liste=await service.get_offre_service_dujour(req.params.date);
        res.send({status:true,data:liste});
    }
    catch(err){
        throw err;
    }
}
module.exports = {get_offre_today};