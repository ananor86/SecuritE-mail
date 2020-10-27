//import { connection } from "./connection";
//import { mysql, connect } from './connection.js'

/**
 * Converts the email into a readable form for
 * the application to be able to use
 * @param {Email object} email 
 */
function interpretEmail(email) {
    //this will change the email into a readable format to process
    let strEmail = email;
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
        let pos = txt.indexOf(phrases[i]);
        if(pos >= 0) {
            score++;
        }
    }

    return score;
}


var phrases = []
var emailtst = "Good afternoon Professor Chu, We are pleased to tell you about the project involving missle flight. There is a missle there and a missle here. The Radar range seems to be be off but that is nothing we cannot handle. Therefore, we will no longer meander around and get to work. Ship Capability. Regards, Elon Musk";
console.log(calcuateScore(emailtst, phrases))
