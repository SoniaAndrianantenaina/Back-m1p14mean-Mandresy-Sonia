var typeDepenseModel = require("./typeDepenseModel");
var liste=async()=>{
    try{
        return await typeDepenseModel.find({});
    }
    catch(e){
        throw e;
    }
}

module.exports ={liste};