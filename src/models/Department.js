const mongoose = require('../config/connection_database');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    created_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true,
    },
    updated_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
    }
}, {
    collection: "department"
})

module.exports = mongoose.model('Department', DepartmentSchema);