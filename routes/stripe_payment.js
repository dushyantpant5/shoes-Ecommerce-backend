
const express = require('express')
const Stripe = require('stripe')


const stripe = Stripe('sk_test_51NdaXNSBznKkRBRD3zO9a2TFGUKjL5U2qbXjYzVnVEk52ncEV0P3XJ9yHutet4WqQVPhWKsvyIF0aDZ5TcLoOsCI00W9LvnOgX')

const router = express.Router()

router.post('/create-checkout-session', async (req, res) => {
    
  const priceInPaise = req.body.price;
  const priceInRupee = priceInPaise*100;

  const session = await stripe.checkout.sessions.create({
  line_items: [
    {
      price_data: {
        currency: 'inr',
        product_data: {
          name: 'Amount to Pay',
        },
        unit_amount: priceInRupee,
      },
      quantity: 1,
    },
  ],
  mode: 'payment',
  success_url: 'http://localhost:3000/success',
  cancel_url: 'http://localhost:3000/cart',
  });

  res.send({url:session.url});
});

module.exports = router