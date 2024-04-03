const stripe = require("stripe")(process.env.secret_key);

exports.createPaymentIntent = async (req, res) => {
    let customer = await stripe.customers.create();
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1299 * 100,
      currency: "usd",
      customer: customer.id,
    });
    const clientSecret = paymentIntent.client_secret;
    
    res.json({
      clientSecret: clientSecret,
      customer: customer.id,
    });
  }