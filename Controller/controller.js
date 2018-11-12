/* Disables the button */
function disableButton(id){

   var btn = document.getElementById(id);

   btn.disabled = true;

}

/* Finds and displays letter(s) found */
function showWord(value){

  let word = value.toLowerCase();
  let words = document.getElementsByName(word);
  let wordFound = false;
  let occurences = 0;

  for(var letter = 0; letter < currentWord.length; letter++){
      if(currentWord[letter] === word.toLowerCase()){
        wordFound = true;
        ++ occurences;
      }
  }

  for(var x = 0; x < words.length; x++){
    words[x].style.color = "black";
  }

  updateScoreGuesses(wordFound, occurences);
}

/* Finds number of correct guesses per game */
function findPoints(currentWord) {

  var foundWords = [currentWord[0]];
  var counter = 1;

  for(var x = 1; x < currentWord.length; x++){
      var noduplicate = true;
      for(var y = 0; y < foundWords.length; y++){
        if(currentWord[x] == foundWords[y]){
            noduplicate = false;
            break;
        }
      }
      if(noduplicate){
        foundWords.push(currentWord[x]);
        counter++;
      }

  }
  return counter;

}

function getEmail(){
     return document.getElementById("inputEmail").value;
}

function getPassword(){
     return document.getElementById("inputPassword").value;
}

function validateAll(){

     var username = document.getElementById("inputUsername").value;

     if (username.length >= 4){
          return true;
     } else{
          let errordiv =  document.getElementById("error");
              errordiv.style.display="block";
              errordiv.innerHTML = "Username has to be longer then 4 characters";
              $("#error").fadeOut(8000);
          return false;
     }
}
function signout(){
     firebase.auth().signOut().then(function() {
       location = "login.html";
     }, function(error) {
       console.error('Sign Out Error', error);
     });
}

function initRank(word) {
   for (var x = 0; x < list.length; x++) {
        insertRank(x + 1, list[x]["username"], list[x]["score"], list[x]["time"], word);
   }
}

function push(username, score, time) {
   let user = {};
   let length = list.length;
   user['username'] = username
   user['score'] = score
   user['time'] = time
   if (list.length == 0) {
        list.push(user);
   } else {
        for (var data = 0; data < length; data++) {
            if (list[data]["score"] < score) {
               list.splice(data, 0, user);
               return;
            }
            if (list[data]["score"] == score && list[data]["time"] > time) {
               list.splice(data, 0, user);
               return;
            }
        }
        list.push(user);
   }

}
