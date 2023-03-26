const { DataTypes } = require('sequelize');
const { db }        = require('../database/config');

const Estudiante = db.define('estudiante',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    documento: {
        type: DataTypes.STRING,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    },
    grado: {
        type: DataTypes.STRING
    },
    voto: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},{
    createdAt: false,
    deletedAt: false,
    updatedAt: false
});

module.exports = Estudiante;