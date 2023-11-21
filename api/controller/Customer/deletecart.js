const { connection } = require('../../utils/database');
const strftime = require("strftime");
const logs = require('../../controller/log');

const deleteProductincart = (req, res) => {
  const CartID = req.query.CartID;
  const UserID = req.query.UserId;  // Assuming you have UserId available in the request

  const query = 'DELETE FROM Cart WHERE CartID = ?';

  connection.query('SELECT * FROM Cart WHERE CartID = ?', [CartID], (selectError, cartData) => {
    if (selectError) {
      console.error('Error selecting product:', selectError);
      logs.log(selectError, 'Customer', '/deleteCartItem');
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      connection.query(query, [CartID], (error) => {
        if (error) {
          console.error('Error deleting product:', error);
          logs.log(error, 'Customer', '/deleteCartItem');
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          const now = new Date();
          const dateCreated = strftime("%Y-%m-%d %H:%M:%S", now);

          const audit = {
            UserId: UserID,
            action: 'DELETE',
            oldValue: JSON.stringify({ cart: cartData[0] }),
            newValue: 'N/A',
            dated: dateCreated,
          };

          connection.query('INSERT INTO Cart_audit SET ?', audit, (auditError) => {
            if (auditError) {
              console.error('Error inserting audit data:', auditError);
              logs.log(auditError, 'Customer', '/deleteCartItem');
              res.status(500).json({ error: 'Internal Server Error' });
            }
            else {
              res.status(200).json({ message: 'Product deleted successfully' });
            }
          });
        }
      });
    }
  });
};

module.exports = {
  deleteProductincart,
};
