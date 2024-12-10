// Importa las funciones necesarias de Firebase
import { getFirestore, doc, getDoc, setDoc, collection } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { db } from '../assets/js/ConnectDB.js';  // Conexión a la base de datos, si ya tienes configurada la conexión.

// Crea una referencia a la colección 'Usernames'
const usernamesCollection = collection(db, "Usernames");


//Manage local storing

let lvlInfo = ['lvlInterval', 'lvlChord', 'lvlScale', 'lvlEar'];
let minigamesInfo = ['game1Score', 'game2Score', 'game3Score'];

lvlInfo.forEach(element => {
  if (!localStorage.getItem(element)) {
    localStorage.setItem(element, 0); // Almacena el valor 0 si no está presente
    console.log('Dato almacenado:', element);
  } else {
    console.log('El dato ya estaba guardado:', element, localStorage.getItem(element));
  }
});



// Función de inicio de sesión
async function checkLogin(user, password) {
  const informationElem = document.getElementById('information');
  try {
    const docRef = doc(usernamesCollection, user);  // Usa la referencia a la colección para obtener el documento del usuario
    const docSnap = await getDoc(docRef);  // Usa async/await para obtener los datos

    if (docSnap.exists()) {
      if (docSnap.data().password === password) {
        informationElem.style.display = 'block';
        informationElem.innerText = `Welcome back, ${user}!`;
        localStorage.setItem('username', user); 
        informationElem.innerText = `Welcome back, ${user}!`;
       // window.location.href =  '../leaderboard/index.html';
      } else {
        informationElem.style.display = 'block';
        informationElem.innerText = "Wrong Password";  // Contraseña incorrecta
      }
    } else {
      informationElem.style.display = 'block';
      informationElem.innerText = "That username does not exist";  // Usuario no encontrado
    }
  } catch (error) {
    console.error("Error during login:", error);
    informationElem.style.display = 'block';
    informationElem.innerText = "An error occurred during login.";
  }
}

// Función de registro
async function checkRegister(user, password) {
  const informationElem = document.getElementById('information');
  try {
    const docRef = doc(usernamesCollection, user);  // Usa la referencia a la colección para acceder al documento
    const docSnap = await getDoc(docRef);  // Usa async/await para obtener los datos

    if (docSnap.exists()) {
      informationElem.style.display = 'block';
      informationElem.innerText = "This username is already taken.";  // El usuario ya existe
    } else {
      // Si el usuario no existe, crea el documento
      await setDoc(docRef, {
        password: password
      });
      informationElem.style.display = 'block';
      informationElem.innerText = "Registration successful!";
      localStorage.setItem('username', user); 
      //window.location.href = '../leaderboard/index.html';
    }
  } catch (error) {
    informationElem.style.display = 'block';
    console.error("Error during registration check:", error);
    informationElem.innerText = "Error";
  }
}

// Evento de login
document.getElementById('Login').addEventListener('click', function() {
  const user = document.getElementById('authUsername').value.trim();
  const password = document.getElementById('authPassword').value.trim();
  const informationElem = document.getElementById('information');
  
  if (user === "" || password === "") {
    informationElem.style.display = 'block';
    informationElem.innerText = "Please fill in both fields.";
  } else {
    //console.log("user:", user);
    //console.log("Password:", password);
    checkLogin(user, password);
  }
});

// Evento de registro
document.getElementById('Register').addEventListener('click', function() {
  const user = document.getElementById('authUsername').value.trim();
  const password = document.getElementById('authPassword').value.trim();
  const informationElem = document.getElementById('information');
  
  if (user === "" || password === "") {
    informationElem.style.display = 'block';
    informationElem.innerText = "Please fill in both fields.";
  } else {
    informationElem.innerText = 'Good';
    //console.log("user:", user);
    //console.log("Password:", password);
    checkRegister(user, password);
  }
});



