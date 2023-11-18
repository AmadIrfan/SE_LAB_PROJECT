const { connection } = require('../../utils/database');
const logs = require('../../controller/log');

const getcustomerProducts = (req, res) => {
  // Assuming you have a query to fetch products from the database
  const query = 'SELECT * FROM Product WHERE IsActive = 1';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching products:', error);
      logs.log(error, 'Customer', '/getproduct');
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports = {
  getcustomerProducts,
};
