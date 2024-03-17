const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const router = express.Router();
const StripeCheckoutSession = require('../models/StripeinMongo'); // Import your Mongoose model

// Route to retrieve and process payment intents
router.get('/', async (req, res) => {
  try {
    const sessions = await stripe.checkout.sessions.list({
      limit: 1,
    });

    
// const lineItems = await stripe.checkout.sessions.listLineItems(
//   'cs_test_b1EDAGIyitQ32SPnAZqzy9aFdRjWi894Ige2Vy71Eur74ZBzXHD4X2TNbp'
// );

    // Iterate through each session and save it to MongoDB

    for (const session of sessions.data) {
      const stripeCheckoutSession = new StripeCheckoutSession(session);
      // console.log('Instance created:', stripeCheckoutSession); // Log instance creation

      await stripeCheckoutSession.save();
    }

    res.json({sessions});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;