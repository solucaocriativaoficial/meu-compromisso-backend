const Sequelize = require('sequelize');
const instance = require('../database/connection_database');
const DistrictModel = require('./District');
const PersonModel = require('./Person');

const ChurcModel = instance.define('Churc',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    image:{
        type: Sequelize.STRING(255),
    },
    zipcode:{
        type: Sequelize.STRING(8),
        allowNull: false,
        defaultValue: '78310000',
    },
    city:{
        type: Sequelize.STRING(200),
        defaultValue: 'comodoro',
        allowNull: false,
    },
    state:{
        type: Sequelize.STRING(2),
        defaultValue: 'mt',
        allowNull: false,
    },
    country:{
        type: Sequelize.STRING(200),
        defaultValue: 'brasil',
        allowNull: false,
    },
    district:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    created_user:{
        type: Sequelize.INTEGER
    },
    updated_user:{
        type: Sequelize.INTEGER,
    },
},{
    tableName: 'churc',
    timestamps: true,
});
PersonModel.hasMany(ChurcModel, {
    foreignKey: "created_user",
    constraints: "churc_created_user"
})
PersonModel.hasMany(ChurcModel, {
    foreignKey: "updated_user",
    constraints: "churc_updated_user"
})
DistrictModel.hasMany(ChurcModel, {
    foreignKey: "district",
    constraints: "churc_district"
})
// ChurcModel.sync();

module.exports = ChurcModel