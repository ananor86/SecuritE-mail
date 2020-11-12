const tunnel = require('tunnel-ssh');
const fs = require('fs');
const mysql = require('mysql')

var key = fs.readFileSync(__dirname + '/EmailScan.pem', 'utf-8')
var phrases = [];

console.log(key)

var connection = mysql.createConnection({
    host: "localhost",
    user: "testuser",
    password: "SecuritE-mail",
    port: "3306",
    database: "securite-mail"

});

var config = {
    username:'ubuntu',
    host:'52.91.199.44',
    dstPort: 22,
    privateKey: key
 };

 var server = tunnel(config, function (error, server) {
    if(error){
        console.log("SSH connection error: " + error);
    }
    console.log('Connected to server!')

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

    server.close();
 });

 setTimeout(() => {console.table(phrases);}, 3000);