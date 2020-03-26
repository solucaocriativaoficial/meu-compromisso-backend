const mongoose = require('../config/connection_database');
const Schema = mongoose.Schema;

const AssociationSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    abbreviation:{
        type: String,
    },
    unity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unity'
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
    collection: "association",
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
})

module.exports = mongoose.model('Association', AssociationSchema);