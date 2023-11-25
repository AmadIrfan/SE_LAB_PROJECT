// buyProduct.js
const { connection } = require("../../utils/database");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const logs = require('../../controller/log');

async function buyProduct(req, res) {
  try {
    const { totalPrice, Id, cartItems } = req.body;

    // Convert cartItems to the expected format
    const formattedCartItems = cartItems.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "pkr",
        product_data: {
          name: "Product",
          images: [
            `http://localhost:4000/images/${item.Images}`,
          ],
        },
        unit_amount: item.unitPrice * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: formattedCartItems,
      mode: "payment",
      success_url: `http://localhost:4000/buy?session_id={CHECKOUT_SESSION_ID}&Id=${Id}&cartItems=${encodeURIComponent(
        JSON.stringify(cartItems)
      )}`,
      cancel_url: "http://localhost:4000/",
    });

    console.log(session.url);
    res.json({ sessionUrl: session.url });

  } catch (error) {
    console.error("Error creating Stripe session:", error);
    logs.log(error, "Customer", "/buyProduct");
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  buyProduct,
};
