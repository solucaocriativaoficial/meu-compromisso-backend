const { Pool, Client } = require('pg');
const settings_database = require('./config_database');

const client = new Client({
    user: settings_database.username,
    host: settings_database.host,
    database: settings_database.database,
    password: settings_database.password
});