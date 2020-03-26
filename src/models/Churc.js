const mongoose = require('../config/connection_database');
const Schema = mongoose.Schema;

const ChurcSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    front_image: {
        type: String,
    },
    zipcode: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    neightborhood: {
        type: String,
    },
    references_address: {
        type: String,
    },
    city: {
        type: String,
        default: 'Comodoro',
        required: true,
    },
    state: {
        type: String,
        default: 'MT',
        required: true,
    },
    country: {
        type: String,
        default: 'Brasil',
        required: true,
    },
    district:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District',
        required: true,
    },
    created_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    },
    updated_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    }
}, {
    collection: 'churc',
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
})

module.exports = mongoose.model('Churc', ChurcSchema);