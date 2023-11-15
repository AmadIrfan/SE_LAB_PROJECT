const { connection } = require('../utils/database');
const logs = require('./log');

const getprofile = (req, res) => {
    // Assuming you have a query to fetch products from the database
    const userid = req.query.UserID;
    const query = `SELECT * FROM User where UserID=${userid}`;

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching products:', error);
            logs.log(error, 'User', '/getprofile');
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(results);
        }
    });
};

module.exports = {
    getprofile,
};
