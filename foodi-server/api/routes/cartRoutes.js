const express = require('express')
const Carts = require('../models/Carts');
const router = express.Router();
// const stripe = require('stripe')(process.env.STRIPE_KEY)



const cartController = require('../controllers/cartControllers')
const verifyToken = require('../middleware/verifyToken')


router.get('/',verifyToken, cartController.getCartByEmail);
router.post('/', cartController.addToCart);
router.delete('/:id', cartController.deleteCart)
router.put('/:id', cartController.updateCart)
router.get('/:id', cartController.getSingleCart)


// router.post('/create-checkout-session', async (req, res) => {
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
//   });

module.exports = router;