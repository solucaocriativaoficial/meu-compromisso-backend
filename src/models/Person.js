const Sequelize = require('sequelize');
const instance = require('../database/connection_database');
// const ChurcModel = require('./Churc');

const PersonModel = instance.define('Person',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    complete_name:{
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    mail:{
        type: Sequelize.STRING(200),
        unique: true,
    },
    image:{
        type: Sequelize.STRING(255),
    },
    zipcode:{
        type: Sequelize.STRING(8),
        allowNull: false,
        defaultValue: '78310000',
    },
    address:{
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    neighborhood:{
        type: Sequelize.STRING(200),
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
    churc:{
        type: Sequelize.INTEGER,
    },
    created_user:{
        type: Sequelize.INTEGER
    },
    updated_user:{
        type: Sequelize.INTEGER,
    },
},{
    tableName: 'person',
    timestamps: true,
});
PersonModel.hasMany(PersonModel, {
    foreignKey: "created_user",
    constraints: "person_created_user"
})
PersonModel.hasMany(PersonModel, {
    foreignKey: "updated_user",
    constraints: "person_updated_user"
})
// PersonModel.sync();

module.exports = PersonModel