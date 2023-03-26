const { request, response } = require("express");
const jwt                   = require('jsonwebtoken');
const Estudiante = require("../models/Estudiante");


const validarJWT = async(req=request, res=response, next)=>{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            mensaje: 'No autorizado'
        });
    }

    try{

        const {id} = jwt.verify(token, process.env.PRIVATESECRETKEY);

        console.log("ID del estudinate: " + id);
        
        const estudiante = await Estudiante.findByPk(id);

        if(!estudiante){
            return res.status(401).json({
                ok: false,
                mensaje: 'No autorizado'
            });
        }

        console.log('Estudiante en el validar ' + estudiante);

        req.estudianteAuth = estudiante;

        next();
    }catch(error){
        console.log(error);
        return res.status(401).json({
            ok: false,
            mensaje: 'Token no autorizado - Error Server'
        });
    }
}

module.exports = {
    validarJWT
}