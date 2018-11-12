var config = {
   apiKey: "AIzaSyCZskTF8kCPar4E34hODvhBtmPmf31xLIk",
   authDomain: "hangman-fb7b2.firebaseapp.com",
   databaseURL: "https://hangman-fb7b2.firebaseio.com",
   projectId: "hangman-fb7b2",
   storageBucket: "hangman-fb7b2.appspot.com",
   messagingSenderId: "110741039912"
};
firebase.initializeApp(config);
var database = firebase.database();
var wordBank = [{word:"university", definition:"where you learn stuff"}, {word:"sam", definition:"student at bcit"},{word:"fish", definition:"sea creature"},{word:"sam", definition:"student at bcit"},{word:"tatoo", definition:"a form of body modification where a design is made by inserting ink"}, {word:"electricity", definition:"is the set of physical phenomena associated with the presence and motion of electric charge"}];
var wordList = ["electricity", "fish", "sam","tatoo","university"];
var userId = "";
var list = [];
var tempUsername = "";
var username = "placeholder";
var currentObject = "";
var currentWord = "";
var endCounter = 0;
var maxGuesses = 7;
var currentPage = true;
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'N', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
'Y', 'Z'];

/* Object Dictionary word as str and definition as str */
function dictionary(word, definition){
  this.word = word;
  this.definition = definition;
}

/* Getter for Word by index */
function getWord(index){
  return wordBank[index];
}

/*Returns length of array */
function length(){
  return wordBank.length;
}

function writeUserData() {
    let score = parseInt(document.getElementById("score").innerHTML);
    let guesses = parseInt(document.getElementById("guesses").innerHTML);
    firebase.database().ref('users/' + userId + "/" + currentWord).update({
       score: score,
       guesses: guesses,
       time : time,
    });
}

function signupData(user){

     let username = document.getElementById("inputUsername").value;
     firebase.database().ref('users/' + user).set({
        username: username
     });

     for(var word = 0; word < wordBank.length; word++){
          firebase.database().ref('users/' + user + "/" + wordBank[word]["word"]).update({
             score: 0,
             guesses: 0,
             time : 0,
          });
     }

     location = "hangman.html";
}
function handlesignup(){

     let validate = false;

     validate = validateAll();

     if(validate){
          signup();
     }
}

function signup() {
   firebase.auth().createUserWithEmailAndPassword(getEmail(), getPassword()).then(function(user) {
          signupData(user.user.uid)
   }).catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        let errordiv =  document.getElementById("error");
        if(error.code == "auth/email-already-in-use" || "auth/weak-password"){
            errordiv.style.display="block";
            errordiv.innerHTML = errorMessage;
            $("#error").fadeOut(8000);

        }
  });

}

function authenticate(){
     firebase.auth().signInWithEmailAndPassword(getEmail(), getPassword()).then(function(user) {
       location = "hangman.html";
        }).catch(function(error) {
             let errorCode = error.code;
             let errorMessage = error.message;
             let errordiv =  document.getElementById("error");
             if(error.code == "auth/email-already-in-use" || "auth/weak-password"){
                 errordiv.style.display="block";
                 errordiv.innerHTML = errorMessage;
                 $("#error").fadeOut(8000);

             }
 });
}

function handlelogin(){

     authenticate();
}


function organizeData() {
  var userData = firebase.database().ref('users')
  userData.once('value', gotData, errData);


  function gotData(data) {
      let count = 1;
      let score = "";
      let time = "";
      let username = "";
      let userdata = data.val();
      for (var rank = 0; rank < wordList.length; rank++) {
          let currentWord = wordList[rank];
          list = [];
          for (var key in userdata) {
              username = userdata[key]["username"]
              for (var childkeys in userdata[key][currentWord]) {
                  if (childkeys == "score")
                      score = userdata[key][currentWord][childkeys]
                  if (childkeys == "time")
                      time = userdata[key][currentWord][childkeys]

              }
              push(username, score, time);
              count++;
          }
          console.log(list);
          initRank(rank);
      }
  }

  function errData(err) {
      console.log(err);
  }
}
