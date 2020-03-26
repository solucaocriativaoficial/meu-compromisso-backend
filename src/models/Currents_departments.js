const mongoose = require('../config/connection_database');
const Schema = mongoose.Schema;

const Currents_departmentsSchema = new Schema({
    departament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true,
    },
    member_role: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    churc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Churc',
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
    collection: "currents_departments",
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
})

module.exports = mongoose.model('Currents_departments', Currents_departmentsSchema);