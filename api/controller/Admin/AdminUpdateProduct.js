const { connection } = require('../../utils/database');
const logs = require('../../controller/log');

const updateProductStatus = (req, res) => {
  try {
    const productId = req.query.productID;
    const { isActive } = req.body;

    const query = 'UPDATE Product SET IsActive = ? WHERE ProductID = ?';
    connection.query(query, [isActive, productId], (error) => {
      if (error) {
        console.error('Error updating product status:', error);
        logs.log(error, 'Admin', '/updateproduct');
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Product status updated successfully' });
      }
    });
  } catch (err) {
    logs.log(err, 'Admin', '/updateproduct');
    return;

  }
};

module.exports = {
  updateProductStatus,
};
