const Sequelize = require('sequelize');
const settings_database = require('../config/connection_sequelize');
const configTableGeral = require('../config/confTablesGeral');

const Department = settings_database.define('department', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false
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

module.exports = Department;