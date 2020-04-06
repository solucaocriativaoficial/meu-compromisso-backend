const mongoose = require('../config/connection_database');
const Schema = mongoose.Schema;

mongoose.set("useCreateIndex", true);

const PersonSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    cpf: {
        type: String,
        unique: true,
        required: true,
    },
    phone:{
        type: Number,
        required: true,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Churc',
    },
    access: {
        password: {
            type:String,
            required: true,
        }
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