const { DataTypes } = require("sequelize");
const { db } = require("../database/config");


const Usuario = db.define('usuario', {
    id: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING
    }
},{
    updatedAt: false,
    createdAt: false
});

module.exports = Usuario;