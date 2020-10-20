const mysql = require('mysql')

var connection = mysql.createConnection({
    host: localhost,
    user: "root",
    password: "",
    port: "3306",

});

export {mysql, connection}
