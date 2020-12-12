const fs = require('fs');
const Client = require('ssh2');
const { PassThrough } = require('stream');
const conn = new Client();

//Reads in the file that contains the key for the server hosting the database.
var key = fs.readFileSync(__dirname + '/keys/EmailScan.pem', 'utf-8');

var score = 0;
/**Creates the connection to the server hosting the database,
 * and then executes the python script on the server,
 * receives the score from the server.
 */
function server(command) {
    var flag = true;
    conn.on('ready', () => {
        if (flag) {
        console.log('Client :: ready');
        //This executes the python script on the server hosting the database.
        conn.exec('python3 backend/handler.py <<< "'+ command + '" ', (err, stream) => {
            if (err) throw err;
            //Debugging print statements
            stream.on('close', (code, signal) => {
                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                conn.end();
                }).on('data', (data) => {
                    console.log('STDOUT: ' + data);
                    score = parseInt(String.fromCharCode(data[0]));
                    flag = false;
                }).stderr.on('data', (data) => {
                    console.log('STDERR: ' + data);
                });
            });
        }
        else {
            PassThrough
        }
    //Server connection options
    }).connect({
        host: 'ec2-52-91-199-44.compute-1.amazonaws.com',
        dstPort: 8080,
        username: 'ubuntu',
        privateKey: key
    });

    setTimeout(() => { module.exports.score = score; }, 2000);
}

module.exports.server = server;