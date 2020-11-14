const tunnel = require('tunnel-ssh');
const fs = require('fs');
const mysql = require('mysql');
const Client = require('ssh2');
const { SSL_OP_TLS_BLOCK_PADDING_BUG } = require('constants');
const conn = new Client()


var key = fs.readFileSync(__dirname + '/EmailScan.pem', 'utf-8')
var phrases = [];

// console.log(key)

var connection = mysql.createConnection({
    host: "ec2-52-91-199-44.compute-1.amazonaws.com",
    user: "SYSTEM_USER",
    password: "SecuritE-mail",
    port: "3306",
    database: "phrases"

});

var config = {
    username:'ubuntu',
    host:'52.91.199.44',
    dstPort: 22,
    privateKey: key
 };

 var command = "Good afternoon Professor Chu, We are pleased to tell you about the project involving missile flight." +
 "There is a missile there and a missile here. The Radar range seems to be be off but that is nothing we " +
 "cannot handle." +
 "Therefore, we will no longer meander around and get to work. Ship Capability. Missile flight. Regards, " +
 "Elon Musk";
var score = 0;
 conn.on('ready', () => {
    console.log('Client :: ready');
    conn.exec('python3 backend/handler.py <<< "'+ command + '" ', (err, stream) => {
        if (err) throw err;

        stream.on('close', (code, signal) => {
            console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
            conn.end();
        }).on('data', (data) => {
            console.log('STDOUT: ' + data);
            score = parseInt(String.fromCharCode(data[0]))
            //score = score[0]
        }).stderr.on('data', (data) => {
            console.log('STDERR: ' + data);
        });
    });

}).connect({
    host: 'ec2-52-91-199-44.compute-1.amazonaws.com',
    port: 22,
    username: 'ubuntu',
    privateKey: key
});

setTimeout(() => console.log(score), 2000)

/*
 var server = tunnel(config, function (error, server) {
    if(error){
        console.log("SSH connection error: " + error);
    }
    console.log('Connected to server!')

    var spawn = require('child_process');
    const child = spawn.exec('ls'); 
        child.stdout.on('data', (data) => { 
        console.log(`stdout: ${data}`); 
        }); 
  
        child.stderr.on('data', (data) => { 
            console.error(`stderr: ${data}`); 
        }); 
  
        child.on('close', (code) => { 
            console.log(`child process exited with code ${code}`); 
        }); 


    /*
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

*/