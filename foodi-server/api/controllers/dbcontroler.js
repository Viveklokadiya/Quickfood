const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const router = express.Router();

// ... (Stripe, Mongoose setup as before)

// Route to retrieve and process payment intents
router.get('/payment-intents', async (req, res) => {
    try {
      const paymentIntents = await stripe.paymentIntents.list({
        limit: 100 // Adjust limit as needed
      });
  
      const processedIntents = await Promise.all(paymentIntents.data.map(async (intent) => {
        let productDetails;
  
        // Assuming you store product data in your database 
        // with either metadata or a separate Products collection
        if (intent.metadata && intent.metadata.productId) {
          productDetails = await Product.findById(intent.metadata.productId);
        }  
  
        return {
          id: intent.id,
          status: intent.status,
          amount: intent.amount,
          currency: intent.currency,
          // Assuming 'charges' has already been expanded
          itemQuantity: intent.charges.data[0].amount_captured / productDetails.price, 
          productDetails
        };
      }));
  
      res.json(processedIntents);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  



module.exports = router;