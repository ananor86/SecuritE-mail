
var mailboxItem;

//Getting the composing email when button is pressed.
Office.initialize = function () {
    mailboxItem = Office.context.mailbox.item;
}

/*
Function will return the notification message given the body of the email.
Function is called when pressing the SecuritE-mail button on Outlook.

@param event    Button pressed
*/
function getBody(event) {
    mailboxItem.body.getAsync(Office.CoercionType.Text , 
        async function (asyncResult){
          if (asyncResult.status == Office.AsyncResultStatus.Succeeded) {
            const body = asyncResult.value;     //Getting the body of the email in text form

            //Fetch method for the POST request in index.js
            const data = { body };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            let response = await fetch('/api', options);
            let responseJson = await response.json();
            let finalscore = responseJson.finalscore;

            //Notification messages depending on the scoring of var finalscore
            if (finalscore == 0) {
                informationalStatus("NONE", "Feel free to send this email!");
            }
            else if(finalscore == 1) {
                informationalStatus("LOW", "This email may contain sensitive information.");
            }
            else if(finalscore == 2) {
                errorStatus("MEDIUM", "Please check over this email to make sure you do not send sensitive information.");
            }
            else if(finalscore > 2) {
                errorStatus("HIGH", "This email contains a decent amount of sensitive information. Please reconsider sending this email.");
            }

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

/*
Function creates/replaces an informational notification message given the Risk Level and Message

@param level    Risk level of the score (0,1)
@param message  Message of said risk level
*/
function informationalStatus(level, message) {
    mailboxItem.notificationMessages.replaceAsync("Risk", {
        type: "informationalMessage",
        icon: "email-icon-16",
        message: "Risk Level is " + level + ". " + message,
        persistent: false
      });
}

/*
Function creates/replaces an error notification message given the Risk Level and Message

@param level    Risk level of the score (2+)
@param message  Message of said risk level
*/
function errorStatus(level, message) {
    mailboxItem.notificationMessages.replaceAsync("Risk", {
        type: "errorMessage",
        message: "Risk Level is " + level + ". " + message,
      });
}
