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
    modification_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
    }
}, {
    collection: 'member',
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
})
module.exports = mongoose.model('Member', MemberSchema);