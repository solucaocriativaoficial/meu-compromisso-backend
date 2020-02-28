const Sequelize = require('sequelize');
const settings_database = require('../config/connection_sequelize');
const configTableGeral = require('../config/confTablesGeral');

const Notification = settings_database.define('notification', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    scale: {
        type: Sequelize.INTEGER,
    },
    displayed_notification: {
        type: Sequelize.STRING(19),
    },
    describe_notification: {
        type: Sequelize.STRING(255),
    }
}, configTableGeral)

module.exports = Notification;