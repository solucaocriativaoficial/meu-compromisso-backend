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
    collection: "district",
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
})

module.exports = mongoose.model('District', DistrictSchema);