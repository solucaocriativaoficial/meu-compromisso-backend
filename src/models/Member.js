const mongoose = require('../config/connection_database');
const Schema = mongoose.Schema;
const MemberSchema = new Schema({
    complete_name: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
        unique: true,
    },
    date_of_birth: {
        type: String,
        required: true,
    },
    contact_phone: String,
    mail: String,
    image: String,
    complete_address: {
        type: Map,
    },
    created_at:{
        type: Date,
        required: true,
    },
    modification_at: {
        type: Date,
        default: Date.now,
        required: true,
    },
    modification_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
    }
}, {
    collection: 'member'
})
module.exports = mongoose.model('Member', MemberSchema);