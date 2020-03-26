const mongoose = require('../config/connection_database');
const Schema = mongoose.Schema;


const ScaleSchema = new Schema({
    scale_type: {
        type: String,
    },
    churc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Churc"
    },
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member"
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    },
    visitor_member: {
        type: String,
    },
    scale_date: {
        type: Date,
    },
    confirmed_by_member: {
        type: String,
        default: "não"
    },
    scale_responsible: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member"
    },
    created_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member"
    },
    updated_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member"
    }
}, {
    collection: "scale",
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
})

module.exports = mongoose.model('Scale', ScaleSchema);