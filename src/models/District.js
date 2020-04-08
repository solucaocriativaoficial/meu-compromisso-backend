const mongoose = require('../config/connection_database');
const Schema = mongoose.Schema;

const DistrictSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    association: {
        type: String,
        required: true,
    },
    locality: {
        type: Array,
        required: true
    },
    shepherd: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
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
    collection: 'district',
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
})

module.exports = mongoose.model('District', DistrictSchema);