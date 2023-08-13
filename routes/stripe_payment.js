
const express = require('express')
const Stripe = require('stripe')


const stripe = Stripe(process.env.STRIPE_SEC_KEY)

const router = express.Router()

router.post('/create-checkout-session', async (req, res) => {
  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  

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
  success_url: `${process.env.FRONT_END_URL || process.env.FRONT_END_DEV_URL}success`,
  cancel_url: `${process.env.FRONT_END_URL || process.env.FRONT_END_DEV_URL}cart`,
  });

  res.send({url:session.url});
});

module.exports = router