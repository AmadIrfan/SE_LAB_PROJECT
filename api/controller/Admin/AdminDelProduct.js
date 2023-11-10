

const { connection } = require('../../utils/database');
const strftime = require('strftime');
const logs = require('../../controller/log');

async function deleteProduct(req, response) {
  try {
    const productId = req.query.productID;
    const UserID = req.query.Id;
    const now = new Date();
    const dateCreated = strftime('%Y-%m-%d %H:%M:%S', now);

    connection.query(`SELECT * FROM Product WHERE ProductID=${productId}`, (err, res) => {
      if (err) {
        logs.log(err, 'Admin', '/deleteproduct');
        return;
      }
      else {
        connection.query('INSERT INTO Product_audit (UserID, action, oldValue, newValue,dated) VALUES (?, ?, ?, ?,?)', [UserID, 'DELETE', JSON.stringify({ Product: res[0] }), 'N/A', dateCreated], (err, auditResult) => {
          if (err) {
            logs.log(err, 'Admin', '/deleteproduct');
            return;
          }
          else {
            connection.query(`DELETE from Product where ProductID=${productId}`, (err, res) => {
              if (err) {
                logs.log(err, 'Admin', '/deleteproduct');
                return;
              }
              else {
                return response.status(200).json({ message: "deleted" });
              }
            })
          }
        });
      }
    })
  } catch (err) {
    logs.log(err, 'Admin', '/deleteproduct');
    return;

  }
}

module.exports = {
  deleteProduct,
}
