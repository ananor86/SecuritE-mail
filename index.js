
/*import { createServer } from 'https';
import { readFileSync } from 'fs';
import express from 'express';
*/
const fs = require('fs');
const https = require('https');
const express = require('express');

var app = express();
const options = {
  key: fs.readFileSync('public/keys/localhost+2-key.pem'),
  cert: fs.readFileSync('public/keys/localhost+2.pem')
};

https.createServer(options, app).listen(8080);



