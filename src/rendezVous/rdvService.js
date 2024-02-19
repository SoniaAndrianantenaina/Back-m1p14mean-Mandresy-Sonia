var rdvModel = require("./rdvModel");
var liste=async()=>{
    let liste= await rdvModel.find({});
    return liste;
}
module.exports={liste}