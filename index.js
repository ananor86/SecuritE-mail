//const tunnel = require('./public/tunnel');
//const bodyext = require('./public/bodyextractor');

/*import { createServer } from 'https';
import { readFileSync } from 'fs';
import express from 'express';
*/
const express = require('express');
const fs = require('fs');
var path = require('path');
var app = express();
var publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));

/*app.get('/', function(req, res) {
  console.log(__dirname);
  res.sendFile('bodyextractor.js');
});*/

const options = {
  key: fs.readFileSync('public/keys/localhost+2-key.pem'),
  cert: fs.readFileSync('public/keys/localhost+2.pem')
};

const https = require('https').createServer(options, app);
const port = process.env.PORT || 8080;

https.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server listening on ${port}`);
});



