const { request, response } = require("express");
const { Op, where } = require("sequelize");
const Candidato = require("../models/Candidato");
const Estudiante = require("../models/Estudiante");



const getCandidatos = async(req=request, res=response)=>{

    try{
        const candidatos = await Candidato.findAll();

        const personeros = [];
        const contralores = [];

        candidatos.forEach(candidato =>{
            if(candidato.puesto == 'Personero'){
                personeros.push(candidato);
            }else if(candidato.puesto == 'Contralor'){
                contralores.push(candidato);
            }
        });

        res.status(200).json({
            ok: true,
            mensaje: 'Candidatos',
            candidatos: {
                personeros, 
                contralores
            }
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error interno del servidor'
        });
    }


}

const votar = async(req=request, res=response)=>{

    const {id} = req.params;

    const { idPersonero, idContralor } = req.body;

    let personero = null;
    let contralor = null;

    try{

        const estudiante = await Estudiante.findByPk(id);

        if(estudiante){
            if(estudiante.voto){
                return res.status(401).json({
                    ok: false,
                    mensaje: `El estudiante ya votó`,
                });
            }
        }else{
            return res.status(400).json({
                ok: false,
                mensaje: 'El estudiante no existe'
            });
        }


        const canditatos = await Candidato.findAll({
            where: {
                [Op.or]: [
                    {id: idPersonero},
                    {id: idContralor}
                ]
            }
        });

        if(canditatos.length > 0){
            canditatos.forEach( candidato => {
                if(candidato.puesto == 'Personero'){
                    personero = candidato;
                }else if(candidato.puesto == 'Contralor'){
                    contralor = candidato;
                }
            });
            if(!contralor || !personero){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Uno de los candidatos enviados no exitse'
                });
            }
        }else{
            return res.status(400).json({
                ok: false,
                mensaje: 'Uno de los candidatos enviados no exitse'
            });
        }

        let { votos: votosPersonero  } = personero;
        votosPersonero += 1;

        let { votos: votosContralor } = contralor;
        votosContralor += 1;

        await estudiante.update({
            voto: true
        });

        await personero.update({
            votos: votosPersonero
        });

        await contralor.update({
            votos: votosContralor
        });

        res.status(200).json({
            ok: true,
            mensaje: 'Ha votado correctamente',
            canditatos: {
                personero,
                contralor
            }
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'Error interno del servidor.'
        });
    }
}

const agregarCandidato = async(req=request, res=response) =>{

    const { nombre, apellido, numero, puesto } = req.body;
    const img = req.files.img;
    try{
    
        const candidato = await Candidato.findOne({
            where: {
                numero: numero
            }
        });

        if(candidato){
            return res.status(401).json({
                ok: false,
                mensaje: `El numero ${numero} ya está asignado a otro candidato`
            });
        }

        //TODO Upload images cloudinary


        const body = {
            nombre: nombre,
            apellido: apellido,
            numero: numero,
            puesto: puesto
        }

        const candidatoSaved = await Candidato.create(body);

        res.status(201).json({
            ok: true,
            mensaje: 'Candidato creado correctamente',
            candidato: candidatoSaved
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'Error '
        });
    }

}

const obtenerResultados = async(req=request, res=response)=>{

    const personeros = [];
    const contralores = [];

    let totalVotosContralor = 0;
    let totalVotosPeronero = 0;

    try{
        const canditatos = await Candidato.findAll();
    
        if(canditatos.length > 0){
            canditatos.forEach( candidato => {
                if(candidato.puesto == 'Personero'){
                    personeros.push(candidato);
                    totalVotosPeronero += candidato.votos;
                }else if(candidato.puesto == 'Contralor'){
                    contralores.push(candidato);
                    totalVotosContralor += candidato.votos;
                }
            });
        }

        const estudiantesVotantes = await Estudiante.count();

        const estudiantesVotaron = await Estudiante.count({
            where: {
                voto: true
            }
        });

        const estudiantesNoVotaron = await Estudiante.count({
            where: {
                voto: false
            }
        })


        res.status(200).json({
            ok: true,
            mensaje: 'Datos obtenidos.',
            candidatos: {
                personeros: personeros,
                contralores: contralores
            },
            totalPersoneros: totalVotosPeronero,
            totalContralores: totalVotosContralor,
            estudiantesVotantes, 
            estudiantesVotaron,
            estudiantesNoVotaron
        })
        

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'Error interno del servidor'
        });
    }

    
}

const reiniciarVotacion = async(req=request, res=response) =>{

    try{

        await Candidato.update({
            votos: 0
        }, {
            where: {
            }
        });

        await Estudiante.update({
            voto: false
        },{
            where: {
                voto: true
            }
        });

        res.status(200).json({
            ok: true,
            mensaje: 'Votacion reiniciado correctamente'
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'Error interno del servidor'
        });
    }

}

module.exports = {
    getCandidatos,
    votar, 
    agregarCandidato,
    obtenerResultados,
    reiniciarVotacion
}