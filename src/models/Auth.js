const mongoose = require('../config/connection_database');
const Schema = mongoose.Schema()
const AuthSchema = new Schema({
    member: String,
    password_access: String,
    privileges_m: String,
    token_access: String,
    token_expired: String,
    created_at: Date,
    updated_at: Date,
})

module.exports = mongoose.Model('access', AuthSchema);