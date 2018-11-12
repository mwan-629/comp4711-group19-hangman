
/* initalizes/resets game */
function init(){

  var random = Math.floor((Math.random() * (length())) + 0);
  console.log(random);
  currentObject = getWord(random);
  currentWord = currentObject.word;

  resetWordContainer();
  createPanel(currentWord);
  endCounter = findPoints(currentWord);
  console.log(endCounter);
  createWordDef(currentObject);
  document.getElementById("guesses").innerHTML = maxGuesses;
  document.getElementById("score").innerHTML = 0;
}

/* creates panel for the game */
function createPanel(currentWord){

  let controlPanel = document.getElementById('controlpanel');


  for (var alphastart = 0; alphastart < alphabet.length; alphastart++){

    var btn = document.createElement("BUTTON");
    btn.innerHTML = alphabet[alphastart];
    btn.id = alphastart;
    btn.setAttribute("onclick", "showWord(this.innerHTML);disableButton(this.id)");
    btn.className = "btn btn-primary";
    controlPanel.appendChild(btn);
  }

}

/* creates guessing word */
function createWordDef(guessWord){

  let str = guessWord.word;
  let wordContainer = document.getElementById("word");

  for (var x = 0; x < str.length; x++){
    var span = document.createElement("span");
    span.innerHTML = str[x];
    span.setAttribute("name", str[x]);
    span.className = "word"
    wordContainer.appendChild(span);
  }
  updateQuote(guessWord.definition);
}

/* Shows quote in view */
function updateQuote(str){
    document.getElementById("quote").innerHTML = "\"" + str + "\"";
}

/* Updates Guesses in view */
function updateScoreGuesses(bool, occurences){

  let score = document.getElementById("score");
  let guesses = (document.getElementById("guesses"));
  let currentScore = parseInt(score.innerHTML);
  let currentGuesses = parseInt(guesses.innerHTML);
  console.log(occurences);
  if(bool){
    score.innerHTML = currentScore + occurences;
    --endCounter
  }
  else{
    score.innerHTML = --currentScore;
    guesses.innerHTML = --currentGuesses;
  }

  if(currentGuesses === 0 || endCounter == 0){
    for(var button = 0; button < alphabet.length; button++){
      document.getElementById(button).disabled = true;
      console.log("writing");
      writeUserData();
    }
  }
}

function redirect(){
         window.location.href = "hangman.html";
}

function notMainPage(){
     currentPage = true;
}

function insertRank(count, username, score, time, wordnumber) {
   let container = document.getElementById("word" + wordnumber);
   let div = document.createElement("div");
   div.innerHTML = document.getElementById("econtainer" + wordnumber).innerHTML
   container.appendChild(div);
   document.getElementsByName("erank" + wordnumber)[count].innerHTML = count;
   document.getElementsByName("etime" + wordnumber)[count].innerHTML = time;
   document.getElementsByName("eusername" + wordnumber)[count].innerHTML = username;
   document.getElementsByName("escore" + wordnumber)[count].innerHTML = score;
}

function initLoginText(){

     let loginelement = document.getElementsByClassName("login");
     loginelement[0].innerHTML = login;
     loginelement[1].innerHTML = login;
     document.getElementById("form-heading").innerHTML = loginhead;
     document.getElementById("loginmsg").innerHTML = loginmsg;
     document.getElementById("signup").innerHTML = signupmsg;
}

function initSignupText(){
     document.getElementById("signupmsg1").innerHTML = signupmsg1;
     document.getElementById("login").innerHTML = login;
     document.getElementsByClassName("signup")[0].innerHTML = signupmsg;
     document.getElementsByClassName("signup")[1].innerHTML = signupmsg;
     document.getElementById("sign-heading").innerHTML = signuphead;
}

function initHangmanText(){
     document.getElementById("title").innerHTML = title;
     document.getElementsByClassName("signout")[0].innerHTML = signoutmsg;
     document.getElementsByClassName("restart")[0].innerHTML = restartmsg;
     document.getElementById("timertext").innerHTML = timertext;
     document.getElementById("score").innerHTML = initalscore;
     document.getElementById("guesses").innerHTML = initalguess;
     document.getElementById("ranking").innerHTML = rankingmsg;
}

function initRankText(){

     let rowlength = document.getElementsByClassName("rank").length;

     document.getElementById("title").innerHTML = ranktitle;
     for(var row = 0; row < rowlength; row++){
          document.getElementsByClassName("rankhead")[row].innerHTML = rankheading[row];
          document.getElementsByClassName("rank")[row].innerHTML = ranktext;
          document.getElementsByClassName("time")[row].innerHTML = timetext;
          document.getElementsByClassName("username")[row].innerHTML = usernametext;
          document.getElementsByClassName("score")[row].innerHTML = stext;
     }
}
