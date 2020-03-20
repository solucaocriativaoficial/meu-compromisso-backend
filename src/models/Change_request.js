const mongoose = require('../config/connection_database');
const Schema = mongoose.Schema;
const Change_requestSchema = new Schema({
    scale: Number,
    requested_member: Number,
    requested_date: Date,
    status_requisition: String,
    accept_date: Date,
}, {
    collection: 'change_request'
})

module.exports = mongoose.Model('Change_request', Change_requestSchema);