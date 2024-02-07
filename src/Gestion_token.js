const jwt = require('jsonwebtoken');
const key='LaClef!45';
const key2='14Clef>';
const options={
    expiresIn:'1h'
};
const options2={
    expiresIn:'8h'
};

const get_token=(data)=>{
    const playload={
        id:data.id
    };
    let value={
        "token":jwt.sign(playload,key,options),
        "jeton_r":jwt.sign(playload,key2,options2),
        "id":data.id
    }
   return value;
}
const verif_rafraichissement=(data)=>{
    try{
        jwt.verif(data.jeton_r,key2);
        return true;
    }
    catch(e){
        return false;
    }
}

const verif_token=(data)=>{ // json contenant token,jeton_r,_id
    try{
        jwt.verif(data.token,key);
        let value={
            "token":data.token,
            "jeton_r":data.jeton_r,
            "id":data._id
        }
        return value;
    }
    catch(e){
        if(verif_rafraichissement(data)){
            return get_token(data);
        }
        else{
            return false;
        }
    }
}
module.exports = {get_token,verif_token};