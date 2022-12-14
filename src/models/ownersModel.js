const mongoose = require('mongoose')

const ownersSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: mongoose.Types.ObjectId
        },
        name: {
            type: String,
            required: true,
            unique: true
        },
        birthDate: {
            type: String,
            required: true
        },
        cpf: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },

    {
        timeStamp: true
    }
)

const Model = mongoose.model("owners", ownersSchema)

module.exports = Model