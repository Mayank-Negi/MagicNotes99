//web app's Firebase configuration
console.log("this is login form js");
var firebaseConfig = {
    apiKey: "AIzaSyCKGBxHY6QNYJv32h7DT9IZpdm7R3_QZCE",
    authDomain: "magic-notes-21.firebaseapp.com",
    projectId: "magic-notes-21",
    storageBucket: "magic-notes-21.appspot.com",
    messagingSenderId: "103651493121",
    appId: "1:103651493121:web:0709f85a51858bf1fe4700"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

//Function for Signing Up user
function signUp() {

    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
}

//Function for Signing In user
function signIn() {

    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
}


//To check whether the user has signed in or out
auth.onAuthStateChanged(function (user) {
    if (user) {
        window.location.replace("magicNotesHome.html");
        var email = user.email;
        alert("Active User " + email);
    }
    else {
        alert("Please Sign in");
    }
})