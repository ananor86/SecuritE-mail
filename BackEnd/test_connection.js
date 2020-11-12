const AWS = require('aws-sdk');
const express = require("express");

var app = express();
var options = {
  accessKeyId: '',
  secretAccessKey: ''
};
var AWS_credentials = new AWS.Credentials(options);
AWS.config.update({
  region: 'us-east-1',
  credentials: AWS_credentials
});
var params = {
  AvailabilityZone: 'us-east-1',
  InstanceId: 'i-0e09d64cb9b6e227e',
  InstanceOSUser: 'ubuntu',
  SSHPublicKey: 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCJq2AzwBqUZzJ2oPEMjBVLO/iOXR6vk7CQwLmtWyBvjsUbGhwOq+CMFGxbVOMAYwYcyEzfaHDGlxZwm3qiM4f6bc+p3Ivy2v+Lirg/4o0FBHLrUwcyqHZ+tVQ8h68ny+/IfkwOuzjiQwNQaQGfyOjPxRxIloZwrP0aBpih5tqFOWQiLnLsHz41Iph6xpnxjR5riMY7Lq0ETJaPEmSKQqgQT4wyy1Gmn3ZYR/pwRBElgwhOhvmRcLHZHa3hU+jYWCJW3qaBHhfxS7BKARG4Q9iUFglceO82YNvpdJIThGIXwrJTVKdEnSzQQ0s7pw4tTgVVer07srwgzkp5Xugz8S75'
};

var ec2instanceconnect = new AWS.EC2InstanceConnect();
ec2instanceconnect.sendSSHPublicKey(params, function(err, data) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  } else {
    console.log(data); // successful response
  }
});

/*
//var AWS_ACCESS_KEY_ID = '';
//var AWS_SECRET_ACCESS_KEY = '';

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
});*/





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