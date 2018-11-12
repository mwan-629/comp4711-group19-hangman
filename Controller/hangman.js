var time = 0;

var myTimer = setInterval(function() {
  time += 1;
  document.getElementById("time").innerHTML = time;
}, 1000);

/* resets the container */
function resetWordContainer(){
  let container = document.getElementById('word');
  container.innerHTML = "";
  document.getElementById("controlpanel").innerHTML = "";
  clearInterval(myTimer);
  time = 0;
  document.getElementById("time").innerHTML = 0;
  myTimer = setInterval(function() {
    time += 1;
    document.getElementById("time").innerHTML = time;
  }, 1000);
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    userId = user.uid;
  } else {
    // No user is signed in.
  }
});
