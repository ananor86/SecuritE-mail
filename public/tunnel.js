const fs = require('fs');
const mysql = require('mysql');
const Client = require('ssh2');
const conn = new Client()
const { SSL_OP_TLS_BLOCK_PADDING_BUG } = require('constants');



var key = fs.readFileSync(__dirname + '/keys/EmailScan.pem', 'utf-8')
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
    dstPort: 8080,
    privateKey: key
 };

var score = 0;
function server(command) {
    conn.on('ready', () => {
    console.log('Client :: ready');
    conn.exec('python3 backend/handler.py <<< "'+ command + '" ', (err, stream) => {
        if (err) throw err;
        stream.on('close', (code, signal) => {
            console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
            conn.end();
            }).on('data', (data) => {
                console.log('STDOUT: ' + data);
                score = parseInt(String.fromCharCode(data[0]));
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });

    }).connect({
        host: 'ec2-52-91-199-44.compute-1.amazonaws.com',
        dstPort: 8080,
        username: 'ubuntu',
        privateKey: key
    });

    setTimeout(() => { module.exports.score = score; }, 2000);
}

module.exports.server = server;
