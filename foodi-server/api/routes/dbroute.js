const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const router = express.Router();

// ... (Stripe, Mongoose setup as before)

// Route to retrieve and process payment intents
router.get('/', async (req, res) => {
    try {
      const paymentIntents = await stripe.paymentIntents.list({
        limit: 100 // Adjust limit as needed
      });
  
    const sessions = await stripe.checkout.sessions.list({
        limit: 3,
    })
    //   const session = await stripe.checkout.sessions.retrieve(
    //     'sk_test_51OtrLkSGJyU1SSTsSg7eHA6sChjQVAravJCuWhOG7U8YRBN4RJToRXKeMZgVYbX6MGFGKY9v6XBvaU9rn7OssFUu007wugzLtZ'
    //   );
  
    // const lineItems = await stripe.checkout.sessions.listLineItems(
    //     sessions[0].id, {},
    //   );
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  



module.exports = router;