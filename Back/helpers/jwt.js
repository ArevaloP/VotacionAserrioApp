const jwt = require('jsonwebtoken');

const generarJWT = (id = '') =>{

    return new Promise((resolve, reject)=>{

        const payload = {
            id
        }

        jwt.sign(payload, process.env.PRIVATESECRETKEY, {
            expiresIn: '1h'
        }, (err, token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el jwt');
            }else{
                resolve(token);
            }
        })
    });
}

module.exports = {
    generarJWT
}