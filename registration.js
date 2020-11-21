var firebaseConfig = {
    apiKey: "AIzaSyBXUBOdWCCbj36s4F7Qg7UcHBh49wHzbfM",
    authDomain: "project1-c595d.firebaseapp.com",
    databaseURL: "https://project1-c595d.firebaseio.com",
    projectId: "project1-c595d",
    storageBucket: "project1-c595d.appspot.com",
    messagingSenderId: "511988040894",
    appId: "1:511988040894:web:717307c6a0b7c499604aef",
    measurementId: "G-MLEPXJ2QH5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();
let formMessage = firebase.database().ref('register');
//listen for submit event//
document.getElementById('registrationform').addEventListener('submit', formSubmit);

//Submit form
function formSubmit(e) {
    e.preventDefault();
    // Get Values from the DOM
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(user) {
    var user = firebase.auth().currentUser;
    sendMessage("userName", email, user.uid)
  })
  .catch(function(error) {
    // no `if (error)` is needed here: if `catch` is called, there was an error
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("There went something wrong : " + errorMessage);
  });
/*

    sendMessage(name, email, password);
    //Show Alert Message
    //document.querySelector('.alert').style.display = 'block';

    //Hide Alert Message After Seven Seconds
    setTimeout(function () {
        document.querySelector('.alert').style.display = 'none';
    }, 7000);
*/
    document.getElementById('registrationform').reset();
}

var password = document.getElementById("password")
    , confirm_password = document.getElementById("confirm_password");

function validatePassword() {
    if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
        confirm_password.setCustomValidity('');
    }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

function sendMessage(name, email, password) {
    let newFormMessage = formMessage.push();
    newFormMessage.set({
        name: name,
        email: email,
        password: password
    });
}


