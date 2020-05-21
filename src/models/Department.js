const Sequelize = require('sequelize');
const instance = require('../database/connection_database');
const PersonModel = require('./Person');
const ChurcModel = require('./Churc');

const DepartmentModel = instance.define('Department',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    department_name:{
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    churc:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    year_current:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    created_user:{
        type: Sequelize.INTEGER
    },
    updated_user:{
        type: Sequelize.INTEGER,
    },
},{
    tableName: 'department',
    timestamps: true,
});
PersonModel.hasMany(DepartmentModel, {
    foreignKey: "created_user",
    constraints: "department_created_user"
})
PersonModel.hasMany(DepartmentModel, {
    foreignKey: "updated_user",
    constraints: "department_updated_user"
})
ChurcModel.hasMany(DepartmentModel, {
    foreignKey: "churc",
    constraints: "department_churc"
})

// DepartmentModel.sync();

module.exports = DepartmentModel