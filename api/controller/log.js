const { connection } = require("../utils/database");

async function log(msg, portal, route) {
    connection.query(`INSERT INTO backendlog (errormsg,portal,route) values("${msg}","${portal}","${route}") `, (err, res) => {
        if (err) throw err;
    });
}

module.exports = {
    log,
};