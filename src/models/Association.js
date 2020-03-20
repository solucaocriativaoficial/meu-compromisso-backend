const mongoose = require('../config/connection_database');
const Schema = mongoose.Schema;
const Association = new Schema({
    name: String,
    abbreviation: String,
    unity: Number,
    created_at: Date,
    updated_at: Date,
    created_user: String,
    updated_user: String,
}, {
    collection: 'association'
})

module.exports = mongoose.Model('Association', Association);