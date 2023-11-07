const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {
    var token = req.headers.authorization;
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, '123456asdfghjkljasjdhgasdyt6rt2376tuasgd', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'failed' });
        } else {
            return res.status(200).json({ message: 'succeed' });
        }
    });
}

function requireRoles(roles) {
    return (req, res, next) => {
        const userRole = req.body.role;
        if (roles.includes(userRole)) {
            next();
        } else {
            res.status(403).json({ message: 'Permission denied' });
        }
    };
}


module.exports = { 
    validateToken, 
    requireRoles 
};


