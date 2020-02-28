const Sequelize = require('sequelize');
const settings_database = require('../config/connection_sequelize');
const configTableGeral = require('../config/confTablesGeral');

const Scale = settings_database.define('scale', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    scale_type: {
        type: Sequelize.STRING(200),
    },
    churc: {
        type: Sequelize.INTEGER,
    },
    member: {
        type: Sequelize.INTEGER,
    },
    department: {
        type: Sequelize.INTEGER,
    },
    visitor_member: {
        type: Sequelize.STRING(255),
    },
    scale_date: {
        type: Sequelize.DATEONLY,
    },
    confirmed_by_member: {
        type: Sequelize.STRING(3),
        defaultValue: "não"
    },
    scale_responsible: {
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

module.exports = Scale;