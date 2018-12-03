var username;
var password;
var email;
var poolData;
var identity;

//Register Function
function submit_login_btn() {

	name =  document.getElementById("register_username").value;
    email = document.getElementById("register_email").value;
    password = document.getElementById("register_password").value;

    poolData = {
            UserPoolId : _config.cognito.userPoolId, // Your user pool id here
            ClientId : _config.cognito.clientId // Your client id here
        };

    //create new obj with poolData
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var attributeList = [];

    var dataEmail = {
        Name : 'email',
        Value : email, //get from form field
    };

    var dataName = {
        Name : 'name',
        Value : name, //get from form field
    };

    //create new obj for email, name
    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);


    attributeList.push(attributeEmail);
    attributeList.push(attributeName);
    userPool.signUp(email, password, attributeList, null, function(err, result){
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }

        cognitoUser = result.user;
        console.log(result.userSub);
        post_toDB(document.getElementById("register_username").value, result.userSub)
        //console.log('Email: ' + cognitoUser.getUsername());
        //change elements of page
        document.getElementById("titleheader").innerHTML = "Check your email for a verification link";

    });
    }

    //Post to dynamoDB: userid, cognitoid
    function post_toDB(id,cognitoid){
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", 'https://cg3adfllh2.execute-api.us-west-2.amazonaws.com/development/user', true);
        xhttp.setRequestHeader("Content-Type", "application/json")
        var data = {'token': cognitoid,
                    'userid': id,
                    'cognitoid': cognitoid}
        xhttp.send(JSON.stringify(data));
    }

    //Login function
    function register_login() {

        var authenticationData = {
            Email : document.getElementById("login_username").value,
            Password : document.getElementById("login_password").value,
        };

        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        identity = authenticationDetails;
        var poolData = {
            UserPoolId : _config.cognito.userPoolId, // Your user pool id here
            ClientId : _config.cognito.clientId, // Your client id here
        };

        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

        var userData = {
            Username : document.getElementById("login_username").value,
            Pool : userPool,
        };

        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                var accessToken = result.getAccessToken().getJwtToken();
                console.log(accessToken);
                window.location.href = "hangman.html";
            },
            onFailure: function(err) {
                alert(err.message || JSON.stringify(err));
            },
        });
      }

      console.log(identity);

      function btnLogout(){
        var poolData = {
            UserPoolId : _config.cognito.userPoolId, // Your user pool id here
            ClientId : _config.cognito.clientId, // Your client id here
        };
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        var cognitoUser = userPool.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.signOut();
              window.location.href = "index.html";
        };
	   if (localStorage.getItem("rankUpUser") != null){
			storage.removeItem("rankUpUser");
			window.location.href = "index.html";
		}
	   }
