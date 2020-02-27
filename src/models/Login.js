const Sequelize = require('sequelize');
const config_database = require('../config/connection_sequelize');
const confTableGeral = require('../config/confTablesGeral');

const Login = config_database.define('Login', {
    member:{
        type: Sequelize.INTEGER
    },
    cpf:{
        type: Sequelize.STRING(14),
    },
    password_access:{
        type: Sequelize.STRING(255)
    },
    privileges_m:{
        type: Sequelize.STRING(50)
    }
}, confTableGeral)
module.exports = Login;