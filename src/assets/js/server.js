import 'https://www.gstatic.com/firebasejs/7.2.0/firebase-app.js';
import 'https://www.gstatic.com/firebasejs/7.2.0/firebase-firestore.js';


// Firebase DB Setup
const firebaseConfig = {
    apiKey: "AIzaSyCnIRvU2nGB4OnQhKOBLfz6feoM2qup21Y",
    authDomain: "usarnames-313c5.firebaseapp.com",
    projectId: "usarnames-313c5",
    storageBucket: "usarnames-313c5.firebasestorage.app",
    messagingSenderId: "660074645723",
    appId: "1:660074645723:web:9d621b3e1a855228c464fe",
    measurementId: "G-7KRGJQSLE9"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Check Login Function
function checkLogin(user, password) {
    const informationElem = document.getElementById('information');
    db.collection("Usernames").doc(user).get().then(doc => {
        if (doc.exists) {
            if (doc.data().password === password) {
                informationElem.style.display = 'block';
                informationElem.innerText = `Welcome back, ${user}!`;

                // Store the username in localStorage (or sessionStorage)
                localStorage.setItem('username', user); // Store in localStorage

                // Optionally, update the header immediately
                document.getElementById('information').innerText = `Welcome back, ${user}!`;
                
                // You could also redirect to another page after successful login if desired
                // window.location.href = "/ear-training/level.html?level=1"; // Example redirect
            } else {
                informationElem.style.display = 'block';
                informationElem.innerText = "Wrong password.";
            }
        } else {
            informationElem.style.display = 'block';
            informationElem.innerText = "That username does not exist.";
        }
    }).catch(error => {
        console.error("Error during login:", error);
        informationElem.style.display = 'block';
        informationElem.innerText = "An error occurred during login.";
    });
}

// Check Register Function
function checkRegister(user, password) {
    const informationElem = document.getElementById('information');
    db.collection("Usernames").doc(user).get().then(doc => {
        if (doc.exists) {
            informationElem.style.display = 'block';
            informationElem.innerText = "This username is already taken.";
        } else {
            db.collection("Usernames").doc(user).set({
                password: password,
                data: `New user: ${user}`
            }).then(() => {
                informationElem.style.display = 'block';
                informationElem.innerText = "Registration successful! You can now log in.";
            }).catch(error => {
                console.error("Error during registration:", error);
                informationElem.style.display = 'block';
                informationElem.innerText = "An error occurred during registration.";
            });
        }
    }).catch(error => {
        console.error("Error during registration check:", error);
        informationElem.style.display = 'block';
        informationElem.innerText = "An error occurred during registration.";
    });
}

// Event Listeners
document.getElementById('Login').addEventListener('click', function() {
    const user = document.getElementById('authUsername').value.trim();
    const password = document.getElementById('authPassword').value.trim();
    const informationElem = document.getElementById('information');
    if (user === "" || password === "") {
        informationElem.style.display = 'block';
        informationElem.innerText = "Please fill in both fields.";
    } else {
        checkLogin(user, password);
    }
});

document.getElementById('Register').addEventListener('click', function() {
    const user = document.getElementById('authUsername').value.trim();
    const password = document.getElementById('authPassword').value.trim();
    const informationElem = document.getElementById('information');
    if (user === "" || password === "") {
        informationElem.style.display = 'block';
        informationElem.innerText = "Please fill in both fields.";
    } else {
        checkRegister(user, password);
    }
});