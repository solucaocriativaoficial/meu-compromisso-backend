const mongoose = require('../config/connection_database');
const Schema = mongoose.Schema;

const DistrictSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    association: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Association'
    },
    shepherd:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true,
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
    collection: "district"
})

module.exports = mongoose.model('District', DistrictSchema);