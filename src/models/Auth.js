const mongoose = require('../config/connection_database');
const Schema = mongoose.Schema;
const AuthSchema = new Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member"
    },
    password: {
        type: String,
        required: true,
    },
    privileges_m: {
        type: String,
        required: true,
    },
    token_access: {
        type: String,
    },
    token_expired: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,        
        required: true,
        default: Date.now
    },
    modification_at: {
        type: Date,
        default: Date.now
    },
    modification_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member"
    }
},{
    collection: 'authentication'
})

module.exports = mongoose.model('Authentication', AuthSchema);