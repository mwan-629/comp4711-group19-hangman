//Model: Stores data, objects, updates the view
let alphabets = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let wordList = ["tattoo","electricity","school","homework","hello","world","chicken","pizza","apple","microsoft"];
let definitionList = ["a form of body modification where a design is made by inserting ink",
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
let randomNum = Math.floor(Math.random() * wordList.length);
let generateWord = wordList[randomNum];
let guessWord = generateWord.split(''); //Splits the word into characters
let wordSize = guessWord.length;
let wordSize2 = wordSize;
let storeId = new Array(wordSize);
//Definition
let wordDefinition = definitionList[randomNum].toString();
let getDef = document.createTextNode(wordDefinition);
//User guess limit
let defaultGuessLimit = 7;
//User score
let defaultScore = 0;
//Popup message
let modal = document.getElementById('myModal');
let span = document.getElementsByClassName("close")[0];
let popupMsg = document.getElementById("popup_msg");
//Reset button
let resetBtn = document.createElement("button");
let btnText = document.createTextNode("Play Again?");

let loginPoolData = {
    UserPoolId : _config.cognito.userPoolId, // Your user pool id here
    ClientId : _config.cognito.clientId, // Your client id here
};
let userPool = new AmazonCognitoIdentity.CognitoUserPool(loginPoolData);
let cognitoUser = userPool.getCurrentUser();
let userInfo = {};
let globalid; 

function getUserInfo() {
    let json = {}
    const params = new URLSearchParams(location.search);
    if (location.search !== "" && params.get("rankUpUser") !== "null") {
        if (params.has("rankUpUser")) {
            let userJson = JSON.parse(params.get("rankUpUser"))
            json = {
                "id": userJson.sub,
            };
            getExistingUserInfo(json,userJson)
            // createUserRankUp(userJson,json)
            localStorage.setItem("rankUpUser", JSON.stringify(userJson))
            console.log(json);
        }
    } else if (cognitoUser !== null){
        let cognitoid = cognitoUser.username;
        json = {
            "id": cognitoid,
        };
        getExistingUserInfo(json);
    } else {
        window.location.href = "index.html";
    }

}

function getExistingUserInfo(json, userJson) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", 'https://cg3adfllh2.execute-api.us-west-2.amazonaws.com/development/user/info', true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            if (xhttp.responseText === "null") {
                createUserRankUp(userJson,json)
            } else {
                userInfo = JSON.parse(xhttp.responseText);
                  updateUser(userInfo.userid);
                document.getElementById("points").innerHTML = userInfo.score;
                defaultScore = userInfo.score;
            }
        }
    };
    xhttp.send(JSON.stringify(json));
}

function setUserInfo(data) {
    userInfo = data;

}

function createUserRankUp(userdata,json){
        // getExistingUserInfo(userdata.sub);
        
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", 'https://cg3adfllh2.execute-api.us-west-2.amazonaws.com/development/user', true);
        xhttp.setRequestHeader("Content-Type", "application/json")
        xhttp.onreadystatechange = getExistingUserInfo(json);
        let data = {'token': userdata.sub,
                    'userid': userdata.given_name,
                    'rankupid':userdata.sub
                    }
        xhttp.send(JSON.stringify(data));
    
}

