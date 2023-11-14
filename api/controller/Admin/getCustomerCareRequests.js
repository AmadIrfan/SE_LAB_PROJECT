const { connection } = require('../../utils/database');
const logs = require('../../controller/log');

const getcustomerrequests = (req, res) => {
  // Assuming you have a query to fetch products from the database
  const query = 'SELECT * FROM CustomerCare';
  
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching requests:', error);   
      logs.log(error,'Admin','/getCustomerCareRequests');

      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports = {
    getcustomerrequests,
};
