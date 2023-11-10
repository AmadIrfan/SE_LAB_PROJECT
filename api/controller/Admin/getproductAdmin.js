const { connection } = require('../../utils/database');
const logs = require('../../controller/log');

const getAdminProducts = (req, res) => {
  // Assuming you have a query to fetch products from the database
  const query = 'SELECT * FROM Product';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching products:', error);
      logs.log(error, 'Admin', '/getproducts');
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports = {
  getAdminProducts,
};
