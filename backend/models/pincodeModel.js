const mongoose = require('mongoose');

const pincodeSchema = mongoose.Schema(
    {
        pincode: {
            type: String,
            required: true,
            unique: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        deliveryTime: {
            type: String,
            default: '30-45 mins',
        },
        isServiceable: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Pincode = mongoose.model('Pincode', pincodeSchema);

module.exports = Pincode;
