const tunnel = require('./public/tunnel.js');
const express = require('express');
const fs = require('fs');
var path = require('path');
var app = express();
var publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));
app.use(express.json());

var emailBody;
var score;
/** Creates a post request to bodyextractor.js
 * This will receive the email body text from the 
 * front end, send it to the server to receive a
 * score and then return the score to the front end.
 */
app.post('/api', (request, response) => {
    emailBody = request.body.body;
    console.log(emailBody)
    tunnel.server(emailBody);
    
    setTimeout(() => { score = tunnel.score }, 2000);
    setTimeout(() => { console.log(score); }, 3000);

    setTimeout(() => { response.json( { finalscore: score }) }, 3000);
});

/**This is where the user specifies what keys/certificates that have 
 * on their machine to create a safe connection with the web server.
 */
const options = {
  key: fs.readFileSync('public/keys/localhost+2-key.pem'),
  cert: fs.readFileSync('public/keys/localhost+2.pem')
};
//Creates the web server object
const https = require('https').createServer(options, app);
const port = process.env.PORT || 8080;
//Starts up the web server
https.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server listening on ${port}`);
});
