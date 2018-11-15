//Model: Stores data, objects, updates the view
var alphabets = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var wordList = ["tattoo","electricity","school","homework","hello","world","chicken","pizza","apple","microsoft"];
var definitionList = ["a form of body modification where a design is made by inserting ink",
                      "is the set of physical phenomena associated with the presence and motion of electric charge",
                      "an institution for educating children",
                      "schoolwork assigned to be done outside the classroom",
                      "used to express a greeting",
                      "the earth or globe, considered as a planet",
                      "the flesh of the chicken",
                      "a flat, open-faced baked pie of Italian origin",
                      "the usually round, red or yellow, edible fruit of a small tree",
                      "computer software company, founded 1975"];

//Guessing word
var randomNum = Math.floor(Math.random() * wordList.length);
var generateWord = wordList[randomNum];
var guessWord = generateWord.split(''); //Splits the word into characters
console.log(guessWord);
var wordSize = guessWord.length;
var wordSize2 = wordSize;
var storeId = new Array(wordSize);
//Definition
var wordDefinition = definitionList[randomNum].toString();
var getDef = document.createTextNode(wordDefinition);
//User guess limit
var defaultGuessLimit = 7;
//User score
var defaultScore = 0;
//Popup message
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
var popupMsg = document.getElementById("popup_msg");
//Reset button
var resetBtn = document.createElement("button");
var btnText = document.createTextNode("Play Again?");

//If defaultScore value exists, replace default value with current value
if (localStorage.getItem("saveScore") !== null) {
    defaultScore = localStorage.getItem("saveScore");
}
localStorage.setItem("saveScore", defaultScore);
