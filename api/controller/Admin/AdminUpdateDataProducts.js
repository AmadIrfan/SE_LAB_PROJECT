const { connection } = require('../../utils/database');
const strftime = require('strftime');
const logs = require('../../controller/log');


const updateProduct = (req, res) => {
    try {
        const productId = req.query.productID;
        const Name = req.body.pname;
        const Description = req.body.pdesc;
        const Price = req.body.price;
        const Condition = req.body.pcond;
        const Category = req.body.pcat;
        const Location = req.body.ploc;
        const now = new Date();
        const UpdatedAt = strftime('%Y-%m-%d %H:%M:%S', now);

        let query;
        let params;

        if (req.file) {
            query = 'UPDATE Product SET Name=?, Description=?, Price=?, `Condition`=?, Category=?, Location=?, Images=?, UpdatedAt=? WHERE ProductID = ?';
            params = [Name, Description, Price, Condition, Category, Location, req.file.filename, UpdatedAt, productId];
        } else {
            query = 'UPDATE Product SET Name=?, Description=?, Price=?, `Condition`=?, Category=?, Location=?, UpdatedAt=? WHERE ProductID = ?';
            params = [Name, Description, Price, Condition, Category, Location, UpdatedAt, productId];
        }

        // Get the old product data before the update
        connection.query('SELECT * FROM Product WHERE ProductID = ?', [productId], (selectError, oldProduct) => {
            if (selectError) {
                console.error('Error getting old product data:', selectError);
                return res.status(500).json({ error: 'Internal Server Error' });
                logs.log(selectError, 'Admin', '/updateProductdata');
                return;
            }

            // Perform the update
            connection.query(query, params, (updateError) => {
                if (updateError) {
                    console.error('Error updating product:', updateError);
                    logs.log(updateError, 'Admin', '/updateProductdata');
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                // Get the updated product data
                connection.query('SELECT * FROM Product WHERE ProductID = ?', [productId], (selectUpdatedError, updatedProduct) => {
                    if (selectUpdatedError) {
                        console.error('Error getting updated product data:', selectUpdatedError);
                        logs.log(selectUpdatedError, 'Admin', '/updateProductdata');
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }

                    // Create an audit log
                    const audit = {
                        UserId: req.query.Id,
                        action: 'UPDATE',
                        oldValue: JSON.stringify(oldProduct[0]),
                        newValue: JSON.stringify(updatedProduct[0]),
                        dated: UpdatedAt,
                    };

                    // Insert the audit log
                    connection.query('INSERT INTO Product_audit SET ?', audit, (auditError) => {
                        if (auditError) {
                            console.error('Error creating audit log:', auditError);
                            logs.log(auditError, 'Admin', '/updateProductdata');
                            return res.status(500).json({ error: 'Internal Server Error' });
                        }

                        return res.status(200).json({ message: 'Product updated successfully' });
                    });
                });
            });
        });
    } catch (err) {
        logs.log(err, 'Admin', '/updateProductdata');
        return;

    }
};

module.exports = {
    updateProduct,
};
