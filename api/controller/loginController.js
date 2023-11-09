const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connection } = require('../utils/database');
const logs = require('./log');


// Login endpoint
function login(req, res) {
    const { Email, Password } = req.body;
  
    // Check if the user exists in the database
    connection.query(`SELECT * FROM User WHERE Email = '${Email}' and Password='${Password}'`, async (err, results) => {
      if (err) {
        console.error(err);
        logs.log(err, 'Customer,Admin', '/login');
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Compare the provided password with the hashed password from the database
      const user = results[0];
      const passwordMatch = await bcrypt.compare(Password, user.Password);
  
    //   if (!passwordMatch) {
    //     return res.status(401).json({ message: 'Invalid credentials' });
    //   }
  
      // Create a JWT token for authentication
      const token = jwt.sign({ UserID: user.UserID, role: user.Role }, '123456asdfghjkljasjdhgasdyt6rt2376tuasgd', { expiresIn: '1h' });
  
      // Log the user's role and UserID to the console
      console.log(`User Role: ${user.Role}, UserID: ${user.UserID}`);
  
      // Send UserID in the response
      res.status(200).json({ token, role: user.Role, UserID: user.UserID });
    });
  }

module.exports ={
    login,
};
//export login          

