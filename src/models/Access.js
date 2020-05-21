const Sequelize = require('sequelize');
const instance = require('../database/connection_database');
const PersonModel = require("./Person");

const AccessModel = instance.define('Access',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    person:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    password_crypt:{
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    admin:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    block_access:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
},{
    tableName: 'access',
    timestamps: true,
});
PersonModel.hasMany(AccessModel, {foreignKey: "person"})
// AccessModel.sync();

module.exports = AccessModel