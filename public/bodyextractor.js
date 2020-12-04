var mailboxItem;

Office.initialize = function () {
    mailboxItem = Office.context.mailbox.item;
}


function getBody(event) {
    mailboxItem.body.getAsync(Office.CoercionType.Text , 
        async function (asyncResult){
          if (asyncResult.status == Office.AsyncResultStatus.Succeeded) {
            const body = asyncResult.value;

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

function informationalStatus(level, message) {
    mailboxItem.notificationMessages.replaceAsync("Risk", {
        type: "informationalMessage",
        icon: "email-icon-16",
        message: "Risk Level is " + level + ". " + message,
        persistent: false
      });
}

function errorStatus(level, message) {
    mailboxItem.notificationMessages.replaceAsync("Risk", {
        type: "errorMessage",
        message: "Risk Level is " + level + ". " + message,
      });
}
