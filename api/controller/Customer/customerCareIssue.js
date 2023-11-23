const { connection } = require('../../utils/database');
const logs = require('../../controller/log');

const customercareadd=(req,res,next)=>{
    const {UserID}=req.body;
    const Title=req.body.Title
    const Issue=req.body.Issue
    const Email=req.body.Email
    const data={
        UserID:UserID,
        Title:Title,
        Issue:Issue,
        Email:Email,
    }

    connection.query('INSERT INTO CustomerCare SET ?',data,(err,result)=>{
        if(err){
            console.error(err);
            logs.log(err, 'Customer', '/CustomerCareIssue');
            res.sendStatus(500);
        }
        else{
            console.log('Data inserted');
            res.sendStatus(200);
        }
    });
}
module.exports={
    customercareadd,
};

