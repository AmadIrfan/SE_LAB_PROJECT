const { connection } = require('../../utils/database');
const logs = require('../../controller/log');

async function getcountsina(req, res) {
    try {
        const query1 = 'SELECT count(*) as totalProducts FROM Product';
        const query2 = 'SELECT count(*) as totalCustomers FROM User WHERE Role="customer"';
        const query3 = 'SELECT count(*) as totalShopkeepers FROM User WHERE Role="shopkeeper"';
        const query4 = 'SELECT count(*) as totalPayments FROM ShoppingCart';

        const [result1, result2, result3, result4] = await Promise.all([
            queryPromise(query1),
            queryPromise(query2),
            queryPromise(query3),
            queryPromise(query4),
        ]);

        const counts = {
            totalProducts: result1[0].totalProducts,
            totalCustomers: result2[0].totalCustomers,
            totalShopkeepers: result3[0].totalShopkeepers,
            totalPayments: result4[0].totalPayments,
        };

        res.status(200).json(counts);
    } catch (error) {
        console.error('Error fetching counts:', error);
        logs.log(error, 'Admin', '/getCountsinadmin');

        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function queryPromise(query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    getcountsina,
};
