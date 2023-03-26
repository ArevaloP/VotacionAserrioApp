const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Candidato = db.define('candidato', {
    id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    },
    numero: {
        type: DataTypes.NUMBER
    },
    votos: {
        type: DataTypes.NUMBER
    },
    img: {
        type: DataTypes.TEXT
    },
    puesto: {
        type: DataTypes.STRING
    }
},
{
    createdAt: false,
    updatedAt: false
}
);

module.exports = Candidato;