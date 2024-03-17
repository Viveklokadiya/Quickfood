const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: String,
    address: {
        city: String,
        country: String,
        line1: String,
        line2: String,
        postal_code: String,
        state: String
    },
    lineItems: [{
        name: String,
        quantity: Number,
        amount: Number,
        image: [String],
        idd: String
    }]
});

const ordersession = mongoose.model('order', orderSchema);

module.exports = ordersession;
