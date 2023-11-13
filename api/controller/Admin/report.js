const { connection } = require('../../utils/database');
const logs = require('../../controller/log');

const getreport = (req, res) => {
    // Assuming you have a query to fetch products from the database
    const query = 'SELECT p.ProductID, p.Name, p.Category, p.Condition, sc.UserID, SUM(sc.Quantity) AS TotalQuantitySold, SUM(sc.Quantity * sc.UnitPrice) AS TotalRevenue FROM Product p JOIN ShoppingCart sc ON p.ProductID = sc.ProductID GROUP BY p.ProductID, p.Name, p.Category, p.Condition, sc.UserID;';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching Report:', error);
            logs.log(error, 'Admin', '/report');
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(results);
        }
    });
};

module.exports = {
    getreport,
};
