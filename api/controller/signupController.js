const { transporter } = require('../utils/nodemailer');
const { connection } = require('../utils/database');
const logs = require('./log');


const signup = (req, res, next) => {
  try {
    // const { FirstName, LastName, Email, Phone, Password, Role } = req.body;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Email = req.body.Email;
    const Phone = req.body.Phone;
    const Password = req.body.Password;
    const Role = req.body.role;
    // const Location = req.body.ploc;

    const mailOption = {
      from: '2nd Trust Owner <subhananjum001@gmail.com>',
      to: Email,
      subject: '2nd Trust Application Signup',
      html: `<h1>Signup Successful. You have been registered. Don't share your credentials with others.</h1>
        <p>Your username is ${FirstName} ${LastName}</p>
        <p>Your email is ${Email}</p>
        <p>Your password is ${Password}</p>
        <p>Your role is ${Role}</p>`,
    };

    const userData = {
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Phone: Phone,
      Password: Password,
      Role: Role,
      Active: true,
    };

    connection.query('INSERT INTO User SET ?', userData, (err, result) => {
      if (err) {
        console.error(err);
        logs.log(err, 'Customer,Admin', '/signup');
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      console.log('Data inserted');
      res.redirect('http://localhost:3000'); // Redirect to the home page after successful signup

      transporter.sendMail(mailOption, (emailErr, info) => {
        if (emailErr) {

          console.error(emailErr);
          logs.log(emailErr, 'Customer,Admin', '/signup');
        } else {
          console.log('Email sent');
        }
      });
    });
  } catch (error) {
    console.error('Error during signup:', error);
    logs.log(error, 'Customer,Admin', '/signup');
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  signup,
};
