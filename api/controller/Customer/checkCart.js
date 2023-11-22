
const { connection } = require('../../utils/database');
const logs = require('../../controller/log');

const isInCart = (req, res, next) => {
  const { ProductID, UserID } = req.body;

  // Check if the product is already in the cart for the given user
  connection.query(
    'SELECT COUNT(*) AS count FROM Cart WHERE ProductID = ? AND UserID = ?',
    [ProductID, UserID],
    (err, result) => {
      if (err) {
        console.error(err);
        logs.log(err, 'Customer', '/isInCart');
        res.sendStatus(500);
      } else {
        const count = result[0].count;
        const isInCart = count > 0;

        // Send the response indicating whether the product is in the cart
        res.json({ isInCart });
      }
    }
  );
};

module.exports = {
  isInCart,
};
