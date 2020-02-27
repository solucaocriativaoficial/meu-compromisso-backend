const Sequelize = require('sequelize');
const settings_database = require('../config/connection_sequelize');
const configTableGeral = require('../config/confTablesGeral');

const Access = settings_database.define('access', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    password_access:{
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    member: {
        type: Sequelize.INTEGER,
    },
    privileges_m: {
        type: Sequelize.STRING(50),
        defaultValue: "normal"
    },
    created_at: {
        type: Sequelize.STRING(19)
    },
    updated_at: {
        type: Sequelize.STRING(19)
    }
}, configTableGeral)

module.exports = Access;