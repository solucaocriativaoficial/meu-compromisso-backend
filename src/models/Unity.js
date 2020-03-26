const mongoose = require('../config/connection_database');
const Schema = mongoose.Schema;

const UnitySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    abbreviation:{
        type: String,
    },
    division: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Division'
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
    collection: "unity",
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
})

module.exports = mongoose.model('Unity', UnitySchema);