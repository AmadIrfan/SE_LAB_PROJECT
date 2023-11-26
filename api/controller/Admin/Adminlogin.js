const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {connection}=require('../../utils/database');
const logs = require('../../controller/log');


function GenerateToken(user) {    const payload = {
        role: user.Role,
        id: user.Id,
    };
    const token = jwt.sign(payload, '123456asdfghjkljasjdhgasdyt6rt2376tuasgd');
    return token;
}

async function AdminLogin(req,response){
    const email=req.body.Email;
    const password = crypto.createHash('sub123').update(req.body.Password).digest('hex');
 
    connection.query(`SELECT * FROM User WHERE Email='${email}' and Password='${password}' and Role='Admin'`,(err,res)=>{
        if(err) throw err;
        else{
            if(res.length==0){
                return response.status(200).json({ message: "invalid" });
            }
            else{
                var token = GenerateToken(res);
                return response.status(200).json({
                    message: 'success',
                    email: email,
                    userid: res.Id,
                    token: token,
                });
            }
        }
    })
}

module.exports={
    AdminLogin,
}
