const Sequelize = require('sequelize');
const settings_database = require('../config/database');

const Member = settings_database.define('member', {
    complete_name: {
        type: Sequelize.STRING
    },
    cpf: {
        type: Sequelize.STRING(14)
    },
    date_of_birth:{
        type: Sequelize.DATE,
    },
    contact_phone: {
        type: Sequelize.STRING(14),
    },
    mail:{
        type: Sequelize.STRING,
    },
},{
    timestamps: false
})

//Member.sync({force: true});

module.exports = Member;