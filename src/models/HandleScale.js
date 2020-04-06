const mongoose = require('../config/connection_database');
const Schema = mongoose.Schema;

const HandleScaleSchema = new Schema({
    scale: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Scale",
        required: true,
    },
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person",
        required: true,
    },
    request_member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person",
        required: true,
    },
    request_date: {
        type: String,
        required: true,
    },
    request_confirmation: {
        type: Boolean,
        required: true,
        default: false,
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
    collection: 'handleScale',
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
})

module.exports = mongoose.model('HandleScale', HandleScaleSchema);