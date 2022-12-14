const mongoose = require('mongoose')

const petSchema = new mongoose.Schema(
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
        age: {
            type: Number,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        breed: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        weight: {
            type: String,
            required: true
        },
        condition: {
            type: String,
            required: true
        },
        adopted: {
            type: Boolean,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        description: String,

        owners: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "owners"
        },
    },

    {
        timeStamp: true
    }
)

const Model = mongoose.model("pet", petSchema)

module.exports = Model