const Sequelize = require('sequelize');
const settings_database = require('../config/connection_sequelize');
const configTableGeral = require('../config/confTablesGeral');

const Access = settings_database.define('access', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    member: {
        type: Sequelize.INTEGER,
    },
    password_access:{
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    privileges_m: {
        type: Sequelize.STRING(50),
        defaultValue: "normal"
    },
    token_access: {
        type: Sequelize.STRING(255),
    },
    token_expired: {
        type: Sequelize.STRING(19),
    },
    created_at: {
        type: Sequelize.STRING(19)
    },
    updated_at: {
        type: Sequelize.STRING(19)
    }
}, configTableGeral)

module.exports = Access;