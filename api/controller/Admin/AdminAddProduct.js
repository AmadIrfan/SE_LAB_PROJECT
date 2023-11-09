const { connection } = require('../../utils/database');
const strftime = require("strftime");
const logs = require('../../controller/log');

async function addProduct(req, res, next) {
  try {
    const UserID = req.query.Id;
    const now = new Date();

    const dateCreated = strftime("%Y-%m-%d %H:%M:%S", now);

    const { productName, description, price, condition, category, location, soldOut } = req.body;
    console.log(req.body);
    const images = req.file.filename;

    const data = {
      Name: productName,
      Description: description,
      Price: price,
      Condition: condition,
      Category: category,
      Location: location,
      Images: images,
      IsActive: true,
    };

    connection.query('INSERT INTO Product SET ?', data, (err, result) => {
      if (err) {
        logs.log(err, 'Admin', '/addproduct');

        console.error(err);
        res.sendStatus(500);
        return;
        // Send a server error status back to the frontend
      } else {
        // console.log('Data inserted');
        // res.sendStatus(200); // Send a success status back to the frontend
        connection.query('Select max(ProductID) as Id from Product', (err, maxResult) => {
          if (err) {
            logs.log(err, 'Admin', '/addproduct');
            return;
          }

          else {
            const audit = {
              UserId: UserID,
              action: 'INSERT',
              oldValue: 'N/A',
              newValue: JSON.stringify(data),
              dated: dateCreated,
            };
            connection.query('INSERT INTO Product_audit SET ?', audit, (err, auditResult) => {
              if (err) throw err;
              else {
                return res.status(200).json({ message: 'added' });
              }
            });
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
    logs.log(err, 'Admin', '/addproduct');
    return;
  }
}

module.exports = {
  addProduct,
};
