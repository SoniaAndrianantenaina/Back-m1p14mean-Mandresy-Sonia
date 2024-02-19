var rdvserv=require('./rdvService');
var listefn=async(req,res)=>{
    let liste= await rdvserv.liste();
    res.send({"data": liste})
}
module.exports ={listefn};