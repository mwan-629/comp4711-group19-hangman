firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    location = "hangman.html";
  } else {
    // No user is signed in.
  }
});
