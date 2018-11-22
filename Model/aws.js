var username;
var password;
var email;
var poolData;


//REGISTER
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
        //console.log('Email: ' + cognitoUser.getUsername());
        //change elements of page
        document.getElementById("titleheader").innerHTML = "Check your email for a verification link";
        
    });
    }	


    //LOGIN
    function register_login() {
    
        var authenticationData = {
            Email : document.getElementById("login_username").value,
            Password : document.getElementById("login_password").value,
        };
        
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        
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

      function btnLogout(){
        var poolData = {
            UserPoolId : _config.cognito.userPoolId, // Your user pool id here
            ClientId : _config.cognito.clientId, // Your client id here
        };
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        var cognitoUser = userPool.getCurrentUser();
        
        if (cognitoUser != null) {
            cognitoUser.signOut();         
            console.log("hello")
              window.location.href = "index.html";
        };
      }