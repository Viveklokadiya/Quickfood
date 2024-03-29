const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const router = express.Router();
const Orders = require("../models/order");
const Carts = require("../models/Carts");


 router.get('/:email', async (req, res) => {
    const emaill = req.params.email;

    try {
        const orders = await Orders.find({email:emaill}).sort({ createdAt: -1 });
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




module.exports = router;