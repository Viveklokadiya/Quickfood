const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const router = express.Router();




router.get('/api/stripe/order', async (req, res) => {
    const { session_id } = req.query;
  
    try {
      // Retrieve order data from Stripe using the session ID
      const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items.data.price.product'],
      });
  

  
    const orderData = {
        id: session.id,
        amount: session.amount_total,
        
        customer: session.customer_details,

        // shippingAddress: session.shipping_details.address.city ? session.shipping.address : null,
        lineItems: session.line_items.data.map(item => ({
          name: item.price.product.name,
          quantity: item.quantity,
          
          // Add more item details as needed
        })),
      };





      res.json(orderData);
    } catch (error) {
      console.error('Error retrieving order data from Stripe:', error);
      res.status(500).json({ error: 'Failed to fetch order data from Stripe' });
    }
  });




module.exports = router;



