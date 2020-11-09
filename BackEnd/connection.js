const mysql = require('mysql')

//Creates a connection to my local the AWS mySQL database.
/*
var connection = mysql.createConnection({
    host: "localhost",
    user: "testuser",
    password: "SecuritE-mail",
    port: "3306",
    database: "securite-mail"

});
*/

var connection = mysql.createConnection({
    host: "52.91.199.44",
    user: "SYSTEM_USER",
    password: "SecuritE-mail",
    port: "3306",
    database: "securite-mail",
    insecureAuth : true

});

var phrases = [];
//Tests database connection.
connection.connect(function(err) {
    if(err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.')
    connection.query("SELECT phrase FROM phrases", function (err, result, fields) {
        if (err) throw err;
        for(i = 0; i < result.length; i++) {
            phrases[i] = result[i].phrase;
            console.table(phrases);
          }
      });

      

      connection.end(function(err) {
        if (err) {
          return console.log('error:' + err.message);
        }
        console.log('Close the database connection.');
      });  
});



 