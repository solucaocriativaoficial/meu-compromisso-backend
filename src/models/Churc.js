const Sequelize = require('sequelize');
const settings_database = require('../config/connection_sequelize');
const configTableGeral = require('../config/confTablesGeral');

const Churc = settings_database.define('churc', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    front_image: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
    zipcode: {
        type: Sequelize.STRING(9),
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    neightborhood: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
    references_address: {
        type: Sequelize.STRING(100),
    },
    city: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: 'Comodoro',
    },
    state: {
        type: Sequelize.STRING(2),
        defaultValue: 'MT',
        allowNull: false,
    },
    country: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: 'Brasil'
    },
    district:{
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

module.exports = Churc;