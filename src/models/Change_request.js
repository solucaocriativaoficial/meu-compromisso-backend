const Sequelize = require('sequelize');
const settings_database = require('../config/connection_sequelize');
const configTableGeral = require('../config/confTablesGeral');

const Change_request = settings_database.define('change_request', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    scale: {
        type: Sequelize.INTEGER,
    },
    requested_member: {
        type: Sequelize.INTEGER,
    },
    requested_date: {
        type: Sequelize.DATEONLY,
    },
    status_requisition:{
        type: Sequelize.STRING(7),
    },
    accept_date: {
        type: Sequelize.DATEONLY,
    }
}, configTableGeral)

module.exports = Change_request;