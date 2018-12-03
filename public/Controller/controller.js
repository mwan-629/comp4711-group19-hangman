//Controller: Connects the view and model

//Resets the game
function reset() {
    location.reload();
}

//Grab the element that has the id and replace content to letter
function replace(letter, id) {
    document.getElementById(id).innerHTML = letter;
}

function checkGuess(alphaId) {
    if (guessWord.includes(alphaId)) {
        for(i=0; i < wordSize; i++) {
            var temp = storeId[i];
            var tester = alphaId+i;
            if (temp == tester) {
                replace(alphaId, temp);
                wordSize2--;
                defaultScore++;
                
            }
        }
        console.log(defaultScore);
        updateScore(defaultScore);
        document.getElementById("points").innerHTML = defaultScore;
    } else {
        defaultGuessLimit--;
        defaultScore--;
        updateScore(defaultScore);
        document.getElementById("numOfGuess").innerHTML = defaultGuessLimit;
        document.getElementById("points").innerHTML = defaultScore;

        if (defaultGuessLimit == 0) {
            lose();
        }
    }
    document.getElementById(alphaId).disabled = true;
    document.getElementById(alphaId).style.backgroundColor = "grey";
    document.getElementById(alphaId).style.color = "grey";

    if (wordSize2 == 0) {
        win();
    }
}

function updateScore(defaultScore) {
    var json = {
        "token": userInfo.token,
        "score": defaultScore
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", 'https://cg3adfllh2.execute-api.us-west-2.amazonaws.com/development/updatescore', true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = updateRankings();
    xhttp.send(JSON.stringify(json));
    
}

function updateRankings() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", 'https://cg3adfllh2.execute-api.us-west-2.amazonaws.com/development/updaterankings', true);
    xhttp.setRequestHeader("Content-Type", "application/json")
    xhttp.send();
}


