const mongoose = require('../config/connection_database');
const Schema = mongoose.Schema;

mongoose.set("useCreateIndex", true);

const PersonSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 200,
    },
    image: {
        type: String,
    },
    cpf: {
        type: String,
        unique: true,
        required: true,
        maxlength: 11,
    },
    phone:{
        type: Number,
        required: true,
        minlength: 8,
        maxlength: 11,
    },
    mail: {
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
    address_number: {
        type: String,
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
    churc:{
        churc_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Churc',
        },
        name_churc: {
            type: String,
        },
        district_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'District',
        },
    },
    password: {
        type: String,
        select: false,
    },
    privileges: {
        type: String,
        required: true,
        default: "normal",
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
    collection: 'person',
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
})

module.exports = mongoose.model('Person', PersonSchema);