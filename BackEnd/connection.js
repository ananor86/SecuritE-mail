const mysql = require('mysql')

//Creates a connection to the AWS mySQL database.
var connection = mysql.createConnection({
    host: "ec2-52-91-199-44.compute-1.amazonaws.com",
    user: "SYSTEM_USER",
    password: "SecuritE-mail",
    port: "3306",
    database: "phrases"

});

//Tests database connection.
connection.connect(function(err) {
    if(err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.')
})
