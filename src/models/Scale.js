const mongoose = require('../config/connection_database');
const Schema = mongoose.Schema;

const ScaleSchema = new Schema({
    scale_type: {
        type: String,
        required: true,
    },
    churc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Churc",
        required: true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
    },
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person",
    },
    visitor_member: {
        type: String,
    },
    scale_date: {
        type: String,
        required: true,
    },
    confirmed: {
        confirmation: {
            type: String,
            default: false
        },
        confirmation_date: {
            type: String,
        },
    },
    responsible: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person",
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
    collection: 'scale',
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
})

module.exports = mongoose.model('Scale', ScaleSchema);