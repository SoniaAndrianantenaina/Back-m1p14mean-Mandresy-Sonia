var managerModel = require("./managerModel");
var logIn=async(data)=>{
    const mail=await managerModel.findOne({email:data.email});
// 0 =>mail incorrect
// 1 =>1 mdp incorrect
// 2 =>2 ok
    if(mail){
        // mbola ovaina comparena await bcrypt.compare(plainPassword, hashedPassword);
        const manager=await managerModel.findOne({email:data.email,mdp:data.mdp}); 
        if(manager){ return 2;}
        else{return 1;}
    }  
    else{
        return 0;
    }
}

module.exports ={logIn}
