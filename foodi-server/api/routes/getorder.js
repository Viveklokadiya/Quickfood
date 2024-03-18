const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const router = express.Router();
const Orders = require("../models/order");
const Carts = require("../models/Carts");


// Route to retrieve and process payment intents
// router.get('/', async (req, res) => {
//     const data = req.body.data;
//     // console.log(data);

//     res.json(data);



// //   const {email} = req.query.email;
 
// // try {
// //     const email = req.query.email;
// //     // console.log(email);
// //     const query = {email: email};
// //     const result = await Carts.find(query).exec();
// //     res.status(200).json(result)
// // } catch (error) {
// //     res.status(500).json({message: error.message});
// // }
// });



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