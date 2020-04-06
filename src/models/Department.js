const mongoose = require('../config/connection_database');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
    name_department: {
        type: String,
        required: true,
    },
    churc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Churc",
        required: true,
    },
    person_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person",
        required: true,
    },
    person_function: {
        type: String,
        required: true,
    },
    year_current: {
        type: Number,
        required: true,
    },
    created_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    },
    updated_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    }
}, {
    collection: 'department',
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
})

module.exports = mongoose.model('Department', DepartmentSchema);