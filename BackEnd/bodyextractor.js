var Item;
var Body;

Office.initialize = function () {
    var mailbox = Office.context.mailbox;
    Item = mailbox.item; 

    Body = Item.Body;//Item may throw an error here because it isn't a "mailItem" but it is
    //Casting should fix that
}

//go on with manipulation for reading. Should be pretty simple!
//This specific implementation might need to be refactored to actually work
