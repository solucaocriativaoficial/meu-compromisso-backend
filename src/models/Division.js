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
        required: true,
    },
    updated_user: {
        type: mongoose.Schema.Types.ObjectId,
    }
}, {
    collection: "division"
})

module.exports = mongoose.model('Division', DivisionSchema);