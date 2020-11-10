//import { connection } from "./connection";
//import { mysql, connect } from './connection.js'
const mysql = require('mysql')

//Creates a connection to my local the AWS mySQL database.
/*
var connection = mysql.createConnection({
    host: "localhost",
    user: "testuser",
    password: "SecuritE-mail",
    port: "3306",
    database: "securite-mail"

});
*/
var phrases = [];

function connect() {

    var connection = mysql.createConnection({
        host: "localhost",
        user: "testuser",
        password: "SecuritE-mail",
        port: "3306",
        database: "securite-mail"
    });


    let phrases = [];
    connection.connect(function(err) {
        if(err) {
         console.error('Database connection failed: ' + err.stack);
            return;
     }
        console.log('Connected to database.')
        connection.query("SELECT phrase FROM phrases", function (err, result, fields) {
         if (err) throw err;
            for(i = 0; i < result.length; i++) {
             phrases[i] = result[i].phrase;
            //console.log("index " + i + " " + phrases[i])
             }
         });
        connection.end(function(err) {
            if (err) {
                return console.log('error:' + err.message);
            }
            console.log('Close the database connection.');
        });  
    });

    return phrases;
}
  
phrases = connect();


/**
 * Converts the email into a readable form for
 * the application to be able to use
 * @param {Email object} email 
 */
function interpretEmail(email) {
    //this will change the email into a readable format to process
    let strEmail = email.toUpperCase();
    return strEmail;
}

/**
 * Takes the email and changes it from plaintext
 * to a hashed version found inside the database
 * @param {Email Object} email 
 */
function toHash(email) {
    //hash given string
    let plaintxt = interpretEmail(email);
    let hashText = plaintxt;
    return hashText
}

/**
 * Given an email this will scan through and return the appropriate score
 * 
 * @param {Email Object} email 
 * @param {Array} phrases 
 */
function calcuateScore(email, phrases) {
    //calculate the score of all given words

    //txt is the hashed version of the readable email
    //score is score, duh
    let txt = toHash(interpretEmail(email));
    let score = 0;

    //for each phrase inside the array
    //find an occurence and update the score
    for(i = 0; i < phrases.length; i++) {
        let pos = txt.indexOf(phrases[i].toUpperCase());
        if(pos >= 0) {
            console.log(phrases[i])
            score++;
        }
    }

    return score;
}

function rating(score) {
    if (score == 0) {
        console.log("Risk Level: None");
    } else if (score == 1) {
        console.log("Risk Level: Low");
    } else if (score == 2) {
        console.log("Risk Level: Medium");
    } else {
        console.log("Risk Level: High")
    }
    return score;
}
/*
var phrases = ["Track capacity","Intercept range","Radar range",
    "Missile type","Missile flight","Missile capability","Radar capability",
    "Missile inventory","Ship Capability","Missile Range","Missile Capacity","Track Types", "Trackable Object"]
*/

var emailtst = "Good afternoon Professor Chu, We are pleased to tell you about the project involving missile flight."
        + " There is a missile there and a missile here. The Radar range seems to be be off but that is nothing we cannot handle." 
        + " Therefore, we will no longer meander around and get to work. Ship Capability. Regards, Elon Musk";


        setTimeout(() => {console.log(rating(calcuateScore(emailtst, phrases)));}, 3000);


