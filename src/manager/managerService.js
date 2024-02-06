var managerModel = require("./managerModel");
var logIn=async(data)=>{
    const manager=await managerModel.findOne({email:data.email,mdp:data.mdp});
    if(manager){
        return true;
    }  
    else{
        return false;
    }
}

module.exports ={logIn}
