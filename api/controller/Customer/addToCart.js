const { connection } = require('../../utils/database');
const strftime = require("strftime");
const logs = require('../../controller/log');

const addtocart = (req, res, next) => {
    const { ProductID, UserID } = req.body;
    const data = {
        ProductID: ProductID,
        UserID: UserID,
        Quantity: 1,
        active: true,
    };

    connection.query('INSERT INTO Cart SET ?', data, (err, result) => {
        if (err) {
            console.error(err);
            logs.log(err, 'Customer', '/addToCart');
            return;

            res.sendStatus(500);
        } else {
            const now = new Date();
            const dateCreated = strftime("%Y-%m-%d %H:%M:%S", now);

            const audit = {
                UserId: UserID,
                action: 'INSERT',
                oldValue: 'N/A',
                newValue: JSON.stringify(data),
                dated: dateCreated,
            };

            connection.query('INSERT INTO Cart_audit SET ?', audit, (err, auditResult) => {
                if (err) {
                    logs.log(err, 'Customer', '/addToCart');
                    return;
                }
                else {
                    console.log('Data inserted');
                    res.sendStatus(200);
                }
            });
        }
    });
};

module.exports = {
    addtocart,
};
