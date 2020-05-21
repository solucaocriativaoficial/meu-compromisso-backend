const Sequelize = require('sequelize');
const instance = require('../database/connection_database');
const PersonModel = require('./Person');

const DistrictModel = instance.define('District',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    district_name:{
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    association:{
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    created_user:{
        type: Sequelize.INTEGER
    },
    updated_user:{
        type: Sequelize.INTEGER,
    }
},{
    tableName: 'district',
    timestamps: true,
});
PersonModel.hasMany(DistrictModel, {foreignKey: "created_user",})
PersonModel.hasMany(DistrictModel, {foreignKey: "updated_user"})
// DistrictModel.sync();

module.exports = DistrictModel