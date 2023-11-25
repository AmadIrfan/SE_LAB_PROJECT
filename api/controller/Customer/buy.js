const { connection } = require("../../utils/database");
const strftime = require("strftime");
const logs = require('../../controller/log');

async function buy(req, response) {
    const Id = req.query.Id;
    const cartItems = req.query.cartItems;

    console.log("backend", Id, cartItems);
    const dataArray = JSON.parse(decodeURIComponent(cartItems));
    console.log(dataArray);

    const now = new Date();
    const dateCreated = strftime("%Y-%m-%d %H:%M:%S", now);

    // Create an array to store the values for multiple items
    // const cartItemsData = cartItems.map(item => Object.values(item));

    // Define the SQL query for inserting multiple rows at once
    let count = 0;
    for (let i = 0; i < dataArray.length; i++) {
        count++;
        const sql = "INSERT INTO ShoppingCart SET ?";

        const data = {
            UserId: Id,
            Quantity: dataArray[i].quantity,
            UnitPrice: dataArray[i].unitPrice,
            ProductID: dataArray[i].productID,
        }

        connection.query(sql, data, (err, res) => {
            if (err) {
                console.error("Error inserting Cart Items data:", err);
                logs.log(err, "Customer", "/buy");

                response.status(500).json({ error: "Internal Server Error" });
            } else {
                console.log("added");

                // Audit for item purchase
                const purchaseAudit = {
                    UserId: Id,
                    action: 'PURCHASE',
                    oldValue: 'N/A',
                    newValue: JSON.stringify(data),
                    dated: dateCreated,
                };

                connection.query('INSERT INTO ShoppingCart_audit SET ?', purchaseAudit, (auditErr) => {
                    if (auditErr) {
                        console.error("Error inserting Cart Items audit data:", auditErr);
                        logs.log(auditErr, "Customer", "/buy");

                        response.status(500).json({ error: "Internal Server Error" });
                    }
                    else {
                        console.log('Audit for purchase added');
                    }
                });
            }
        });
    }

    let coun1 = 0
    for (let i = 0; i < dataArray.length; i++) {
        coun1++;

        const sqlb = "DELETE FROM Cart WHERE CartID = ?"
        connection.query(sqlb, dataArray[i].CartID, (err, res) => {
            if (err) {
                console.error("Error deleting Cart Items data:", err);
                response.status(500).json({ error: "Internal Server Error" });
            }
            else {
                console.log("deleted");

                // Audit for item removal from cart
                const removalAudit = {
                    UserId: Id,
                    action: 'REMOVE_FROM_CART',
                    oldValue: JSON.stringify({ cartItem: dataArray[i] }),
                    newValue: 'N/A',
                    dated: dateCreated,
                };

                connection.query('INSERT INTO Cart_audit SET ?', removalAudit, (auditErr) => {
                    if (auditErr) throw auditErr;
                    else {
                        console.log('Audit for removal from cart added');
                    }
                });
            }
        })
    }

    if (count == dataArray.length) {
        response.redirect("http://localhost:3000/customer/boughtProducts");
    }
}

module.exports = {
    buy,
};
