const mongoose = require('../config/connection_database');
const Schema = mongoose.Schema;

const DivisionSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    abbreviation:{
        type: String,
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
    collection: "division",
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
})

module.exports = mongoose.model('Division', DivisionSchema);