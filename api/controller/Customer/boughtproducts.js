const { connection } = require('../../utils/database');
const logs = require('../../controller/log');

const getcustomerProducts = (req, res) => {
    try {
        const UserID = req.query.UserID;

        const query = "SELECT * FROM ShoppingCart JOIN Product on ShoppingCart.ProductID = Product.ProductID WHERE UserID = ?";

        connection.query(query, [UserID], (err, results) => {
            if (err) {
                console.error("Error fetching bought products:", err);
                logs.log(err, "Customer", "/boughtproducts");
                res.status(500).json({ error: "Internal Server Error" });
            } else {
                res.status(200).json(results);
            }
        });
    } catch (error) {
        console.error("Error:", error);
        logs.log(error, "Customer", "/boughtproducts");
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    getcustomerProducts,
};
