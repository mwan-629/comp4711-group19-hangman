let username;
let password;
let email;
let poolData;
let identity;

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
    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    let attributeList = [];

    let dataEmail = {
        Name : 'email',
        Value : email, //get from form field
    };

    let dataName = {
        Name : 'name',
        Value : name, //get from form field
    };

    //create new obj for email, name
    let attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    let attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);


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
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", 'https://cg3adfllh2.execute-api.us-west-2.amazonaws.com/development/user', true);
        xhttp.setRequestHeader("Content-Type", "application/json")
        let data = {'token': cognitoid,
                    'userid': id,
                    'cognitoid': cognitoid}
        xhttp.send(JSON.stringify(data));
    }

    //Login function
    function register_login() {

        let authenticationData = {
            Email : document.getElementById("login_username").value,
            Password : document.getElementById("login_password").value,
        };

        let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        identity = authenticationDetails;
        let poolData = {
            UserPoolId : _config.cognito.userPoolId, // Your user pool id here
            ClientId : _config.cognito.clientId, // Your client id here
        };

        let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

        let userData = {
            Username : document.getElementById("login_username").value,
            Pool : userPool,
        };

        let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                let accessToken = result.getAccessToken().getJwtToken();
                console.log(accessToken);
                window.location.href = "hangman.html";
            },
            onFailure: function(err) {
                alert(err.message || JSON.stringify(err));
            },
        });
      }


      function btnLogout(){
        let poolData = {
            UserPoolId : _config.cognito.userPoolId, // Your user pool id here
            ClientId : _config.cognito.clientId, // Your client id here
        };
        let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        let cognitoUser = userPool.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.signOut();
              window.location.href = "index.html";
        };
	   
	   console.log(localStorage.getItem("rankUpUser"));

	   if (localStorage.getItem("rankUpUser") != null){
			localStorage.removeItem("rankUpUser");
			window.location.href = "index.html";
		}
	   }
