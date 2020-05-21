const Sequelize = require('sequelize');
const instance = require('../database/connection_database');
const ScaleModel = require('./Scale');
const PersonModel = require('./Person');

const HandleScale = instance.define('HandleScale', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    scale:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    requested_person:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    requisition_accept:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    date_accepted:{
        type: Sequelize.DATEONLY,
    }
},{
    tableName: "handle_scale",
    timestamps: true
})

ScaleModel.hasMany(HandleScale,{
    foreignKey: "scale",
    constraints: "handle_scale_scale"
})
PersonModel.hasMany(HandleScale,{
    foreignKey: "requested_person",
    constraints: "handle_scale_person"
})

// HandleScale.sync()

module.exports = HandleScale