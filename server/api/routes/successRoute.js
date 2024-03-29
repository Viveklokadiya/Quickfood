const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const router = express.Router();
const ordersession = require('../models/order');





router.get('/api/stripe/order', async (req, res) => {
    const { session_id } = req.query;
  
    try {
      // Retrieve order data from Stripe using the session ID
      const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items.data.price.product'],
      });
  

  
    const orderData = {
        id: session.id,
        amount: session.amount_total/100,
        
        email: session.customer_details.email,
        name: session.customer_details.name,
        phone: session.customer_details.phone,
        // address: session.customer_details.address,
        fulladress: `${session.customer_details.address.line1}${session.customer_details.address.line2}${session.customer_details.address.city}${session.customer_details.address.state}${session.customer_details.address.postal_code}${session.customer_details.address.country}`,
        OrderStatus:"Pending",

        lineItems: session.line_items.data.map(item => ({
          name: item.price.product.name,
          quantity: item.quantity,
          amount:item.price.unit_amount,
        //   item:item,
          image:item.price.product.images,
          idd:item.price.product.metadata.id,
          
          
          // Add more item details as needed
        })),
      };

      


      res.json(orderData);
      // res.json(session);

      const Ordersession = new ordersession(orderData);
      await Ordersession.save();
    } catch (error) {
      console.error('Error retrieving order data from Stripe:', error);
      res.status(500).json({ error: 'Failed to fetch order data from Stripe' });
    }
  });




module.exports = router;



