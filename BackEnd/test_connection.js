const mysql = require('mysql');
const AWS = require('aws-sdk');
const express = require("express");

var app = express();
// Set the region 
AWS.config.update({
  region: 'us-east-1'
});

var AWS_ACCESS_KEY_ID = '';
var AWS_SECRET_ACCESS_KEY = '';

var params = {
  DryRun: false

};

ec2 = new AWS.EC2({
  apiVersion: '2016-11-15'
});
ec2.describeInstances(params, function(err, data) {
  if (err) {
    console.log("Error", err.stack);
  } else {
    console.log("Success", JSON.stringify(data));
    res.send({
      message: data
    });
  }
});





/*
var connection = mysql.createConnection({
  host: "ec2-52-91-199-44.compute-1.amazonaws.com",
  user: "SYSTEM_USER",
  password: "SecuritE-mail",
  port: "3306",
  database: "securite-mail"

});

connection.connect(function(err) {
  if(err) {
      console.error('Database connection failed: ' + err.stack);
      return;
  }
  console.log('Connected to database.')

  connection.end(function(err) {
    if (err) {
      return console.log('error:' + err.message);
    }
    console.log('Close the database connection.');
  });

});
*/