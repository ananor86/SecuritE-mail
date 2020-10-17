function interpretEmail(str) {
    //this will change the email into a readable format to process
    var txt = str;
    var score = 0;
    var phrase = "testing phrase";
    var pos = txt.indexOf(phrase);

    if(pos >= 0) {
        score++;
    }
}