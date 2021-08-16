//web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCKGBxHY6QNYJv32h7DT9IZpdm7R3_QZCE",
    authDomain: "magic-notes-21.firebaseapp.com",
    projectId: "magic-notes-21",
    storageBucket: "magic-notes-21.appspot.com",
    messagingSenderId: "103651493121",
    appId: "1:103651493121:web:0709f85a51858bf1fe4700"
};


//Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
var database = firebase.database();

//Variables
let entriesName = "";
let addTxt;
let addTitle;
let oneTime = false;


//To check wheter the user has logged in or not
auth.onAuthStateChanged(function (user) {
    if (user != null) {
        curUser = user;
        withoutsplicedName = curUser.email;
        afterSplice = withoutsplicedName.split(".");
        uniqueId = afterSplice[0];
        entriesName = uniqueId + "_notesObj";
        showNotes();
        userName();
    }
    else {
        window.location.replace("index.html");
    }
});

//Function for showing UserName
function userName() {
    let userhtml = "";
    let notesElm = document.getElementById('UserName');
    userhtml += `
    <h6>User: ${curUser.email}</h6>
    `;
    notesElm.innerHTML=userhtml;

}

// for filling the input variables
function fillDatabase() {
    addTxt = document.getElementById('addTxt').value;
    addTitle = document.getElementById('addTitle').value;
}

//for clearing input placeholders
function refreshInputs() {
    document.getElementById('addTxt').value = '';
    document.getElementById('addTitle').value = '';
}

//To send data in firebase database
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {

    fillDatabase();
    firebase.database().ref("notesdata/" + entriesName).push({
        noteTitle: addTitle,
        noteText: addTxt
    });
    refreshInputs();
    showNotes();
})


//Function to show data from database
function showNotes() {
    var ref = database.ref('notesdata/' + entriesName);
    ref.on('value', gotData);

    function gotData(data) {
        let notesElm = document.getElementById('notes');
        let html = "";
        if (data.val() != null) {
            var notesObj = data.val();
            var keys = Object.keys(notesObj);
            for (var i = 0; i < keys.length; i++) {
                var k = keys[i];
                var initials = notesObj[k].noteText;
                var initials2 = notesObj[k].noteTitle;
                html += `
            <div class="noteCard card my-2 mx-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${initials2}</h5>
                <hr>
                <p class="card-text">${initials}</p>
                <button id="${k}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
            </div>  `

            }
            notesElm.innerHTML = html;

        }
        else {
            notesElm.innerHTML = `<h5>[-- Nothing to show here write your first note in 'Add a note' section --]</h1>`
        }
    }
}



// Funtion to delete data from database
function deleteNote(index) {
    var ref = database.ref('notesdata/' + entriesName.toString() + '/' + index).remove();
    showNotes();
}

//To create search functionality
let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {

    let inputVal = search.value;
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})

//function for signing out
function signOut() {
    auth.signOut();
    alert("Signed Out");
}


