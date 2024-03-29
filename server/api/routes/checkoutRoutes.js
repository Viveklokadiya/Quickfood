const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const router = express.Router();

router.post('/', async (req, res) => {

  const line_items = req.body.data.cart.map(item => {
    return {
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
          images: [item.image],
          metadata: {
            id: item.menuItemId
          }
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }
  }
  )

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      // ui_mode: 'embedded',
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:5173/checkout-success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://your-website.com/cancel',

      shipping_address_collection: {
        allowed_countries: ['US', 'CA',],
      },
      phone_number_collection: {
        enabled: true,
      },
      // email
      customer_email: req.body.data.user?.email,


    });

    res.send({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;



