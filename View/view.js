//View: Responsible for event handlers (onclick methods)
//Display the alphabets array as buttons and assign them with id
for (var i = 0; i < alphabets.length; i++) {
    var buttons = document.createElement("button");
    var labels = document.createTextNode(alphabets[i]);
    buttons.appendChild(labels);
    document.getElementById("alphaButtons").appendChild(buttons);
    //Assign id to each button
    var char = (i+10).toString(36); //THIS PART
    buttons.id = char;
    buttons.onclick = function() {checkGuess(this.id);}
}

//Display the guessing word as buttons without labels
for (i = 0; i < wordSize; i++) {
      var inputBox = document.createElement("button");
      inputBox.className = "btn btn-secondary"
      inputBox.disabled = 'true';
      inputBox.id = guessWord[i]+i;
      storeId[i] = inputBox.id;
      console.log(storeId[i])
      document.getElementById("guessingWord").appendChild(inputBox);
}

//Displays the reset button
resetBtn.appendChild(btnText);
document.getElementById("resetButton").appendChild(resetBtn);
resetBtn.onclick = function() {reset();};

//Displays the limit
document.getElementById("numOfGuess").innerHTML = defaultGuessLimit;

//Displays the user's score
document.getElementById("points").innerHTML = defaultScore;

//Displays the word's definition
document.getElementById("guessingWordDefinition").appendChild(getDef);

//Display message and confirm if user wants to play again
function win() {
    window.setInterval(function() {
      modal.style.display = "block";
      popupMsg.innerHTML = "Congratulations! You guessed the word!";

      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
            reset();
      }

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        reset();
      }
    },100);
}

//Display message and confirm if user wants to play again
function lose() {
    window.setInterval(function() {
      modal.style.display = "block";
      popupMsg.innerHTML = "You lost! You used up all your guess!";

      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        reset();
      }

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        reset();
      }
    }, 100);
}
