const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DATABASE, process.env.USERDB, process.env.PASSDB, {
    host: process.env.HOST,
    dialect: 'postgres',
    protocol: 'postgres',
    logging: true,
    dialectOptions: {
        ssl: {
            require: false,
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    db
}