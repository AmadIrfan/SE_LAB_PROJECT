// getUserCart.js (backend controller)
const { connection } = require('../../utils/database');
const logs = require('../../controller/log');

const getUserCartdata = (req, res, next) => {
    const UserID = req.query.UserID;
    // console.log("backend",UserID);

    // Fetch user's cart items from the database
    connection.query(
        'SELECT * FROM `Cart` JOIN Product ON Cart.ProductID =Product.ProductID WHERE UserID = ? AND active = true',
        [UserID],
        (err, results) => {
            if (err) {
                console.error(err);
                logs.log(err, 'Customer', '/getUserCart');
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(200).json(results);
            }
        }
    );
};

module.exports = {
    getUserCartdata,
};
