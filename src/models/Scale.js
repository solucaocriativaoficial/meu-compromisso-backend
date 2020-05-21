const Sequelize = require('sequelize');
const instance = require('../database/connection_database');
const PersonModel = require('./Person');
const Department = require('./Department');
const ChurcModel = require('./Churc');

const ScaleModel = instance.define('Scale',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    department:{
        type: Sequelize.INTEGER,
    },
    person:{
        type: Sequelize.INTEGER,
    },
    scale_type:{
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    churc:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    scale_date:{
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    responsible_for_scale:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    confirm:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    confirm_date:{
        type: Sequelize.DATEONLY,
    },
    created_user:{
        type: Sequelize.INTEGER
    },
    updated_user:{
        type: Sequelize.INTEGER,
    },
},{
    tableName: 'scale',
    timestamps: true,
});


Department.hasMany(ScaleModel, {
    foreignKey: "department",
    constraints: "scale_department"
})
PersonModel.hasMany(ScaleModel, {
    foreignKey: "person",
    constraints: "scale_person"
})
PersonModel.hasMany(ScaleModel, {
    foreignKey: "responsible_for_scale",
    constraints: "scale_responsible_for_scale"
})
ChurcModel.hasMany(ScaleModel, {
    foreignKey: "churc",
    constraints: "scale_churc"
})
PersonModel.hasMany(ScaleModel, {
    foreignKey: "created_user",
    constraints: "scale_created_user"
})
PersonModel.hasMany(ScaleModel, {
    foreignKey: "updated_user",
    constraints: "scale_updated_user"
})

// ScaleModel.sync();

module.exports = ScaleModel