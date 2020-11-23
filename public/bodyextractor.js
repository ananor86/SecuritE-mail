/*import { createRequire } from 'module';
const require = createRequire(import.meta.url);*/

//const connect = require('./tunnel.js');
//import { server, finalscore } from './tunnel.js';

var mailboxItem;

Office.initialize = function () {
    mailboxItem = Office.context.mailbox.item;
}


//Office.onReady();
function getBody(event) {
    mailboxItem.body.getAsync(Office.CoercionType.Text , 
        async function (asyncResult){
          if (asyncResult.status == Office.AsyncResultStatus.Succeeded) {
            const body = asyncResult.value;
/*
            mailboxItem.notificationMessages.addAsync("bodyCheck", {
                type: "informationalMessage",
                icon: "email-icon-16",
                message: "Body: \"" + body + "\"",
                persistent: false
              });*/

            const data = { body };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            var finalscore = await fetch('/api', options)
            .then(function(response) { return response.json() })
            .then(function(responseJson) { return responseJson.finalscore});

            if (finalscore == 0) {
                informationalStatus("NONE", "Feel free to send this email!");
            }
            else if(finalscore == 1) {
                informationalStatus("LOW", "This email may contain sensitive information.");
            }
            else if(finalscore == 2) {
                errorStatus("MEDIUM", "Please check over this email to make sure you do not send sensitive information.");
            }
            else {
                errorStatus("HIGH", "This email contains a decent amount of sensitive information. Please reconsider sending this email.");
            }
            

/*
            mailboxItem.notificationMessages.addAsync("bodyCheck", {
                type: "informationalMessage",
                icon: "email-icon-16",
                message: "Score : \"" + finalscore + "\"",
                persistent: false
              });*/

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

function informationalStatus(level, message) {
    mailboxItem.notificationMessages.addAsync("No to Low Risk", {
        type: "informationalMessage",
        icon: "email-icon-16",
        message: "Risk Level is " + level + ". " + message,
        persistent: false
      });
}

function errorStatus(level, message) {
    mailboxItem.notificationMessages.addAsync("Medium to High Risk", {
        type: "errorMessage",
        message: "Risk Level is " + level + ". " + message,
      });
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