const strftime = require("strftime");
const { transporter } = require('../../utils/nodemailer');
const { connection } = require("../../utils/database");
const logs = require('../../controller/log');

async function reply(req, response) {
    const email = req.body.email;
    const title = req.body.title;
    const reply = req.body.reply;
    const id = req.body.Id;

    console.log(email, title, reply, id);
    console.log(`UPDATE CustomerCare SET replied=true,  IsActive = false WHERE UserID=${id}`);

    connection.query(
        `UPDATE CustomerCare SET replied=true,  IsActive = false WHERE UserID=${id}`,
        (err, res) => {
            if (err) {
                logs.log(err, 'Admin', '/submitReply');
                return;
            }
            else {
                async function send() {
                    const mailOption = {
                        from: '2nd Trust Owner <subhananjum001@gmail.com>',
                        to: email,
                        subject: title,
                        html: `
                  <p>${reply}</p>`,
                    };
                    transporter.sendMail(mailOption, (emailErr, info) => {
                        if (emailErr) {
                            console.error(emailErr);
                            logs.log(emailErr, 'Admin', '/submitReply');
                            return;
                        } else {
                            console.log('Email sent');
                        }
                    });
                    response.status(200).json({ message: "added" });
                }
                send();
            }
        }
    );
}

module.exports = {
    reply,
};