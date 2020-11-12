const mysql = require('mysql')
const fs = require("fs")

//Creates a connection to my local the mySQL database.
/*
var connection = mysql.createConnection({
    host: "localhost",
    user: "testuser",
    password: "SecuritE-mail",
    port: "3306",
    database: "securite-mail"

});
*/

//Creates connection mySQL database on AWS server.

var connection = mysql.createConnection({
    host: "52.91.199.44",
    user: "SYSTEM_USER",
    password: "SecuritE-mail",
    port: "3306",
    ssl: {
      //ca: fs.readFileSync(__dirname + '/EmailScan.pem')
      rejectUnauthorized: false
    }
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
          }
      });

      

      connection.end(function(err) {
        if (err) {
          return console.log('error:' + err.message);
        }
        console.log('Close the database connection.');
      });  
});


// setTimeout(() => {console.table(phrases);}, 3000);
 