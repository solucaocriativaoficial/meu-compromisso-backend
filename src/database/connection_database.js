const {Sequelize} = require('sequelize');
const connection = new Sequelize(process.env.PG_URL);
connection.authenticate().catch((error_connection) => {
    console.log(error_connection)
})

module.exports = connection;