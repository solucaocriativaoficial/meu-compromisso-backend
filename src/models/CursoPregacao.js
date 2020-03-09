const Sequelize = require('sequelize');
const settings_database = require('../config/connection_sequelize');
const configTableGeral = require('../config/confTablesGeral');

const CursoPregacao = settings_database.define('cursopregacao', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    complete_name: {
        type: Sequelize.STRING(255),
    },
    city: {
        type: Sequelize.STRING(255),
        defaultValue: 'Comodoro',
    },
    created_at: {
        type: Sequelize.DATEONLY
    }
}, configTableGeral)

module.exports = CursoPregacao;