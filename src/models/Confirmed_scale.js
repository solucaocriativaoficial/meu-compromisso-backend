const Sequelize = require('sequelize');
const settings_database = require('../config/connection_sequelize');
const configTableGeral = require('../config/confTablesGeral');

const Confirmed_scale = settings_database.define('confirmed_scale', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    scale: {
        type: Sequelize.INTEGER,
    },
    theme_for_action: {
        type: Sequelize.STRING(100),
    },
    confirmation_date: {
        type: Sequelize.STRING(19),
    },
    confirmation_member: {
        type: Sequelize.INTEGER,
    }
}, configTableGeral)

module.exports = Confirmed_scale;