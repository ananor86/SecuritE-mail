const mysql = require('mysql');
const AWS = require('aws-sdk');
const express = require("express");

var app = express();
// Set the region 
AWS.config.update({
  region: 'us-east-1'
});

var AWS_ACCESS_KEY_ID = 'EmailScan';
var AWS_SECRET_ACCESS_KEY = 'MIIEogIBAAKCAQEAiatgM8AalGcydqDxDIwVSzv4jl0er5OwkMC5rVsgb47FGxocDqvgjBRsW1TjAGMGHMhM32hwxpcWcJt6ojOH+m3PqdyL8tr/i4q4P+KNBQRy61MHMqh2frVUPIevJ8vvyH5MDrs44kMDUGkBn8joz8UcSJaGcKz9GgaYoebahTlkIi5y7B8+NSKYesaZ8Y0ea4jGOy6tBEyWjxJkikKoEE+MMstRpp92WEf6cEQRJYMITob5kXCx2R2t4VPo2FgiVt6mgR4X8UuwSgERuEPYlBYJXHjvNmDb6XSSE4RiF8KyU1SnRJ0s0ENLO6cOLU4FVXq9O7K8IM5KeV7oM/Eu+QIDAQABAoIBAFotoRGlB4QoaRzd5afzZstmWDVg+AXIt4LKS5Yrt/57Rc+v9asCmU8I3cWhwCRzuQBHkFtTPXRIadGPdvAi0zKOldXNevq0y2nrjy+BxiAAPwq402EyipQLUUdpFan643GwkT+hEezcOqKEdiTlZOMcWZ+OwjeyiQRwR7Dd2EwlRkW7CL3KtCPkbjrjq6YHhEvLwXRYJwEznozZSzRGA5VTglirrY10m0xKWj/VPZkrDKNP16zqTJvfZILrskiPybMVHEYAkLQgo+JBMftgwW4YCdcPVmlyGTN47J+lcEkAdNRJi0PefXiqjHn/Kk1oEQYe+URqov9Kr8VBpTjw5TUCgYEA4+c/em2P5JdWl3viSihb5VB5RmCeaXFQ51LgxuQFoJQ4omsX40dQqnoQMVjoxNVIywyWiq1zIIX5EX7q+FRpzB5VHpmKLMMlfwLRy4S7qMmGmb/6Ew7ZIRmrUYFVTQdDvIt1rbCyZc5+WSLg1w8BBWldM/ereX8UIZr+qe3OMtcCgYEAmqRMPYn1jlpCO3PMMt2S77N+uFgFw3AYCqmFQ2EFSnHqXnm663VacbiOOg8+Wv+nLDTMkdrlhTfa0wG2lLbYdK0mwIghL5TgpF12lRY6zr6ttM2k8GOpUsQV2EBCXjzmhTZgFXKtzmN6ew2tu+mWsq8g3IYDYzpOlKmISMEHQq8CgYB9ezGkQvbbMchnl7o8goQ2elyLt18BR3b4JtXELIA8rd+Q7c41QWrUsmiAAygGWDjAM6ofqOiem6VLUMom+LNXw8uyEW/WvYvDptXEbMy2Xl9SADW8kIxUgUGmmsNQqhNNmKuuen9/NnaytVV+k7BIPn8mwdMUDjgTWLem8Fx7+QKBgDXLXbIyobdJcqzX1XsEVS8JU9Ww2SBpiBN9cRxFTd/dzNfcpMdv5WyV9PQBhYGGWZMpMtiyOxGion6wo+EL0jSUX1yufkzdD2BeGvg16XMuJaM1vmDZaneeOrMld3Ds4owIpFgRsqCPPnY8BenOklvKTDYqcFc+W0OfzgbxDyOFAoGAEYZ8PtYdV7bWeCdXo4gvvKKspqjrLiTfi4EoRuAfIs3L4yuYbDo5UTD7LSsGbgwcOTE24ursr1LcFAluFFPvelGfPBeUOTCHgChFiEytKvm2VkymjUeJNh8LqwQA+lE5gyEQopEwYfziGXjoUpkEQ3Xrbza+SGdIEOLZssIyinY=';

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