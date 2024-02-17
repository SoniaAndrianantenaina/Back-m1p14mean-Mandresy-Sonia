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
        jwt.verify(data.jeton_r,key2);
        return true;
    }
    catch(e){
        return false;
    }
}

const verif_token=(data)=>{ // json contenant token,jeton_r,_id
    try{
        data.token=data.token.replace(/"/g, '');
        data.jeton_r=data.jeton_r.replace(/"/g, '')
        data.id=data.id.replace(/"/g, '')
        jwt.verify(data.token,key);
        let value={
            "token":data.token,
            "jeton_r":data.jeton_r,
            "id":data.id
        }
        console.log('mety');
        return value;
    }
    catch(e){
        if(verif_rafraichissement(data)){
           
            console.log('mety2');
            return get_token(data);
        }
        else{
            console.log(e);
            return false;
        }
    }
}
module.exports = {get_token,verif_token};