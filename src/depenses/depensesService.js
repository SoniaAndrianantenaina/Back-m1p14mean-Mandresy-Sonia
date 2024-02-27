var depensesModel = require("./depensesModel");
var liste=async()=>{
    try {
      return await depensesModel.find({});
    }
    catch(e){
        throw e;
    }
}

var liste_by_type=async(type)=>{
    try {
    if(type!=''){
        return await depensesModel.find({service:type});
    }
    else{
        return await liste();
    }
    }
    catch(e){
        throw e;
    }
}

// save

module.exports={liste_by_type};