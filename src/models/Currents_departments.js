const Sequelize = require('sequelize');
const settings_database = require('../config/connection_sequelize');
const configTableGeral = require('../config/confTablesGeral');

const Currents_departments = settings_database.define('currents_departments', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    departament: {
        type: Sequelize.INTEGER,
    },
    member: {
        type: Sequelize.INTEGER,
    },
    member_role: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    churc: {
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

module.exports = Currents_departments;