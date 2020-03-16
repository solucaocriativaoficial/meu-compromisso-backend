const pg = require('pg');
pg.defaults.ssl = true;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect: 'postgres',
    protocolo: 'postgres'
})

module.exports = sequelize;