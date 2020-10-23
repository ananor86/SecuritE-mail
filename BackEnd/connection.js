const mysql = require('mysql')

//Creates a connection to the AWS mySQL database.
var connection = mysql.createConnection({
    host: "localhost",
    user: "testuser",
    password: "SecuritE-mail",
    port: "3306",
    database: "securite-mail"

});

//Tests database connection.
connection.connect(function(err) {
    if(err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.')
    connection.query("SELECT phrase FROM phrases", function (err, result, fields) {
        if (err) throw err;
        var phrases = [];
        for(i = 0; i < result.length; i++) {
            phrases[i] = result[i].phrase;
            console.log("index " + i + " " + phrases[i])
          }
      });
});
 