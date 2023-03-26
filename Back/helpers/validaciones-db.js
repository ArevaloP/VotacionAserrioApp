const Estudiante = require("../models/Estudiante")


const existeEstudianteById = async(id)=>{
    const existe = Estudiante.findByPk(id);
    if(!existe){
        throw new Error('El estudiante enviado no existe');
    }
}

module.exports = {
    existeEstudianteById
}