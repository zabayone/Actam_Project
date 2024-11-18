import 'https://www.gstatic.com/firebasejs/7.2.0/firebase-app.js';
import'https://www.gstatic.com/firebasejs/7.2.0/firebase-firestore.js';

// MODEL
let variable1 = ''
let variable2 = ''

// DB SETUP

// Your web app's Firebase configuration
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
export const db = firebase.firestore()

function checkLogin(user,password){
  const informationElem = document.getElementById('information');
  db.collection("Usernames").doc(user).get().then((doc) => {
    if (doc.exists) {
      if(doc.data().password===password){
        informationElem.innerText = doc.data().data;
      }
      else{
        informationElem.innerText = "Wrong Password"; 
      }
    } else {
      informationElem.innerText = "That username does not exist";
    }
    })
    .catch((error) => {
      console.error("Error:", error);
      informationElem.innerText = "Error";
    });
}

function checkRegister(user,password){
  const informationElem = document.getElementById('information');
  db.collection("Usernames").doc(user).get().then((doc) => {
    if (doc.exists) {
        informationElem.innerText = "This user already exist"; 
    } 
    else {
      db.collection("Usernames").doc(user).set({
        password: password,
        data: "new user"+  "  "+user
      })
      .then(() => {
        console.log("Colección y documento creados!");
      })
      .catch((error) => {
        console.error("Error al crear la colección o documento:", error);
      });
    }
    })
    .catch((error) => {
      console.error("Error:", error);
      informationElem.innerText = "Error";
    });
}


document.getElementById('Login').addEventListener('click', function() {
  const user = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  const informationElem = document.getElementById('information');
  if (user === "" || password === "") {
      informationElem.style.display = 'block';
      informationElem.innerText = 'Fill both fields';
  } else {
      checkLogin(user, password);
  }
});

document.getElementById('Register').addEventListener('click', function() {
  const user = document.getElementById('registerUsername').value.trim();
  const password = document.getElementById('registerPassword').value.trim();
  const informationElem = document.getElementById('information');
  if (user === "" || password === "") {
      informationElem.style.display = 'block';
      informationElem.innerText = 'Fill both fields';
  } else {
      checkRegister(user, password);
  }
});


// CONTROL



