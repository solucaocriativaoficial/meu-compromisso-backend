const mongoose = require('../config/connection_database');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
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
    collection: "department",
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
})

module.exports = mongoose.model('Department', DepartmentSchema);