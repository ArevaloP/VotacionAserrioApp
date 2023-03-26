const { request, response } = require("express");
const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/Usuario");


const loginUsuario = async(req=request, res=response) =>{

    try{

        const {username, password} = req.body;

        console.log('usuario: ' + username);

        const usuario = await Usuario.findOne({
            where: {
                username: username
            }
        }); 

        if(!usuario){
            return res.status(200).json({
                ok: false,
                mensaje: 'Las credenciales son incorrectas'
            });
        }
        if(usuario.password !== password){
            return res.status(200).json({
                ok: false,
                mensaje: 'Las credenciales son incorrectas'
            });
        }

        const token = await generarJWT(usuario.id);

        res.status(200).json({
            ok: true,
            mensaje: 'Iniciado correctamente',
            usuario,
            token
        });


    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error interno del servidor'
        });
    }
}

module.exports = {
    loginUsuario
}