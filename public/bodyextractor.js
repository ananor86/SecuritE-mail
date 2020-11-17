const fs = require('fs');
const Client = require('ssh2');
const conn = new Client()

var mailboxItem;

Office.initialize = function () {
    mailboxItem = Office.context.mailbox.item;
}

function getBody(event) {
    mailboxItem.body.getAsync(Office.CoercionType.Text , 
        function (asyncResult){
          if (asyncResult.status == Office.AsyncResultStatus.Succeeded) {
            var score = 0;
            server(asyncResult.value);
            setTimeout(() => { score = _score; }, 2000);

            mailboxItem.notificationMessages.addAsync("bodyCheck", {
                type: "informationalMessage",
                icon: "email-icon-16",
                message: "Score: \"" + score + "\"",
                persistent: false
              });
          }
          else {
            mailboxItem.notificationMessages.addAsync("bodyError", {
              type: "errorMessage",
              message: "Error: " + asyncResult.error.message
            });
          }
          event.completed();
        }
    );
}


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
                //score = score[0]
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

/*
    if (score == 0) {
        informationalStatus("NONE", "Feel free to send this email!");
        asyncResult.asyncContext.completed();
    }
    else if(score == 1) {
        informationalStatus("LOW", "This email may contain sensitive information.");
        asyncResult.asyncContext.completed();
    }
    else if(score == 2) {
        errorStatus("MEDIUM", "Please check over this email to make sure you do not send sensitive information.");
        asyncResult.asyncContext.completed();
    }
    
    errorStatus("HIGH", "This email contains a decent amount of sensitive information. Please reconsider sending this email.");
    asyncResult.asyncContext.completed();
}

function informationalStatus(level, message) {
    mailbox.notificationMessages.addAsync("No to Low Risk", {
        type: "informationalMessage",
        icon: "email-icon-16",
        message: "Risk Level is " + level + "." + message,
        persistent: false
      });
}

function errorStatus(level, message) {
    mailbox.notificationMessages.addAsync("Medium to High Risk", {
        type: "errorMessage",
        message: "Risk Level is " + level + "." + message,
      });
}*/