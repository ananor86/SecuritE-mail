const fs = require('fs');
const Client = require('ssh2');
const conn = new Client()


var key = fs.readFileSync(__dirname + '/keys/EmailScan.pem', 'utf-8')


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
