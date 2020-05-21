const Sequelize = require('sequelize');
const instance = require('../database/connection_database');
const PersonModel = require('./Person');
const DepartmentModel = require('./Department');

const DepartmentOcupationModel = instance.define('DepartmentOcupation',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    department:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    person:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    role:{
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    created_user:{
        type: Sequelize.INTEGER
    },
    updated_user:{
        type: Sequelize.INTEGER,
    },
},{
    tableName: 'department_ocupation',
    timestamps: true,
});


DepartmentModel.hasMany(DepartmentOcupationModel, {
    foreignKey: "department",
    constraints: "department_current_department"
})
PersonModel.hasMany(DepartmentOcupationModel, {
    foreignKey: "person",
    constraints: "department_current_person"
})
PersonModel.hasMany(DepartmentOcupationModel, {
    foreignKey: "created_user",
    constraints: "department_current_created_user"
})
PersonModel.hasMany(DepartmentOcupationModel, {
    foreignKey: "updated_user",
    constraints: "department_current_updated_user"
})

// DepartmentOcupationModel.sync();

module.exports = DepartmentOcupationModel