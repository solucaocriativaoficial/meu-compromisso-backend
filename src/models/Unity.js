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
    collection: "unity"
})

module.exports = mongoose.model('Unity', UnitySchema);