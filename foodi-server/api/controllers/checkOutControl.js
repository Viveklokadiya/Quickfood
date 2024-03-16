const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const router = express.Router();

router.post('/', async (req, res) => {
  const { email, name, address, city, state, zip, country } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Your Product Name',
          },
          unit_amount: 1000,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://your-website.com/success',
      cancel_url: 'https://your-website.com/cancel',
      customer_email: email,
        shipping_address_collection: {
            allowed_countries: ['US'],
          },
          shipping_options: [
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: 1500,
                  currency: 'usd',
                },
                display_name: 'Standard Shipping',
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 5,
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 7,
                  },
                },
              },
            },
          ],
          phone_number_collection: {
            enabled: true,
          },
          metadata: {
            userId: '12345',
            productId: '67890',
          },
        });
    
        res.json({ url: session.url });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    
    module.exports = router;



// const checkout = async (req, res) => {
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: 'T-shirt',
//             },
//             unit_amount: 2000,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: 'http://localhost:5173/checkout-success',
//       cancel_url: 'hhttp://localhost:5173/checkout-success',
//     });
  
//     res.send({url:session.url});
//   };


//   module.exports = {
//     checkout
// }