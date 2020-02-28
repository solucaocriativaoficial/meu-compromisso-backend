const Sequelize = require('sequelize');
const settings_database = require('../config/connection_sequelize');
const configTableGeral = require('../config/confTablesGeral');

const District = settings_database.define('district', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    association:{
        type: Sequelize.INTEGER,
    },
    shepderd:{
        type: Sequelize.INTEGER,
    },
    created_at: {
        type: Sequelize.STRING(19),
    },
    updated_at: {
        type: Sequelize.STRING(19),
    },
    created_user:{
        type: Sequelize.INTEGER,
    },
    updated_user: {
        type: Sequelize.INTEGER,
    }
}, configTableGeral)

module.exports = District;