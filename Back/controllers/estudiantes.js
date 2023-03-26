const { request, response } = require("express");
const { generarJWT } = require("../helpers/jwt");
const Estudiante = require('../models/Estudiante');

const getEstudianteByDoc = async ( req=request, res=response ) => {

    try{
        const { doc  }      = req.params;
        const estudiante    = await Estudiante.findOne({
            where: {
                documento: doc
            }
        });

        if(!estudiante){
            return res.status(200).json({
                ok: false,
                mensaje: 'El Estudiante no existe.'
            });
        }else{
            if(estudiante.voto){
                return res.status(200).json({
                    ok: false,
                    mensaje: `El estudiante ${estudiante.nombre} ya votó`
                });
            }
        }

        

        console.log("Id del estudiante: " + estudiante.id);

        const token = await generarJWT(estudiante.id);

        res.status(200).json({
            ok: true,
            mensaje: 'Estudiante',
            estudiante,
            token
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'Error interno del servidor'
        });
    }
}


const revalidarJWT = async(req=request, res=response)=>{

    const {estudianteAuth} = req;

    console.log(estudianteAuth);

    const token = await generarJWT(estudianteAuth.id);

    return res.json({
        ok: true,
        mensaje: 'Token validado',
        estudiante : estudianteAuth,
        token: token
    });

}

module.exports = {
    getEstudianteByDoc,
    revalidarJWT
}