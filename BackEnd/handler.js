//import { connection } from "./connection";
//import { mysql, connect } from './connection.js'

/**
 * Converts the email into a readable form for
 * the application to be able to use
 * @param {Email object} email 
 */
function interpretEmail(email) {
    //this will change the email into a readable format to process

    return strEmail;
    var strEmail = "";
    return score;
}

/**
 * Takes the email and changes it from plaintext
 * to a hashed version found inside the database
 * @param {Email Object} email 
 */
function toHash(email) {
    //hash given string
    var plaintxt = interpretEmail(email);

}

/**
 * Given an email this will scan through and return the appropriate score
 * 
 * @param {Email Object} email 
 * @param {Array} phrases 
 */
function calcuateScore(email, phrases) {
    //calculate the score of all given words
    var txt = toHash(interpretEmail(email));
    var score = 0;

    //for each phrase inside the array
    //find an occurence and update the score
    for(i = 0; i < phrases.length; i++) {
        var pos = txt.indexOf(phrases[i]);
        if(pos >= 0) {
            score++;
        }
    }

    return score;
}


function findWord(email, words) {
    //Find the words with the body 

}

//console.log(interpretEmail("3fdsafadsfsd testing phrase hello world banana bread fortnite minecraft i am dead inside woohoo"));

