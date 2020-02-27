const Sequelize = require('sequelize');
const settings_database = require('../config/connection_sequelize');
const configTableGeral = require('../config/confTablesGeral');

const Member = settings_database.define('member', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    complete_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cpf: {
        type: Sequelize.STRING(14),
        allowNull: false,
        unique: true,
    },
    date_of_birth:{
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    contact_phone: {
        type: Sequelize.STRING(14),
        allowNull: true,
    },
    mail:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    image:{
        type: Sequelize.STRING(255),
    },
    zipcode:{
        type: Sequelize.STRING(9),
        allowNull: false,
        defaultValue: '78310-000',
    },
    address:{
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    neightborhood:{
        type: Sequelize.STRING(255),
        allowNull: true
    },
    references_address: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    city:{
        type: Sequelize.STRING(255),
        defaultValue: 'Comodoro',
        allowNull: false,
    },
    state:{
        type: Sequelize.STRING(2),
        defaultValue: 'MT',
        allowNull: false,
    },
    country:{
        type: Sequelize.STRING(100),
        defaultValue: 'Brasil',
        allowNull: false,
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
},configTableGeral)

//Member.sync({force: true});
module.exports = Member;