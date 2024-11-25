// Importa las funciones necesarias de Firebase
import { getFirestore, doc, getDoc, setDoc, collection } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { db } from '../assets/js/ConnectDB.js';  // Conexión a la base de datos, si ya tienes configurada la conexión.

// Crea una referencia a la colección 'Usernames'
const usernamesCollection = collection(db, "Usernames");

let currentUser = '';

// Función de inicio de sesión
async function checkLogin(user, password) {
  const informationElem = document.getElementById('information');
  try {
    const docRef = doc(usernamesCollection, user);  // Usa la referencia a la colección para obtener el documento del usuario
    const docSnap = await getDoc(docRef);  // Usa async/await para obtener los datos

    if (docSnap.exists()) {
      if (docSnap.data().password === password) {
        localStorage.setItem('currentUser', user); 
        window.location.href =  '../leaderboard/index.html';
      } else {
        informationElem.innerText = "Wrong Password";  // Contraseña incorrecta
      }
    } else {
      informationElem.innerText = "That username does not exist";  // Usuario no encontrado
    }
  } catch (error) {
    console.error("Error:", error);
    informationElem.innerText = "Error";
  }
}

// Función de registro
async function checkRegister(user, password) {
  const informationElem = document.getElementById('information');
  try {
    const docRef = doc(usernamesCollection, user);  // Usa la referencia a la colección para acceder al documento
    const docSnap = await getDoc(docRef);  // Usa async/await para obtener los datos

    if (docSnap.exists()) {
      informationElem.innerText = "This user already exists";  // El usuario ya existe
    } else {
      // Si el usuario no existe, crea el documento
      await setDoc(docRef, {
        password: password
      });
      console.log("Colección y documento creados!");
      informationElem.innerText = "User registered successfully!";
      localStorage.setItem('currentUser', user); 
      window.location.href = '../leaderboard/index.html';
    }
  } catch (error) {
    console.error("Error al crear el documento:", error);
    informationElem.innerText = "Error";
  }
}

// Evento de login
document.getElementById('Login').addEventListener('click', function() {
  const user = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const informationElem = document.getElementById('information');
  
  if (user === "" || password === "") {
    informationElem.innerText = 'Fill both fields';
  } else {
    console.log("user:", user);
    console.log("Password:", password);
    checkLogin(user, password);
  }
});

// Evento de registro
document.getElementById('Register').addEventListener('click', function() {
  const user = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const informationElem = document.getElementById('information');
  
  if (user === "" || password === "") {
    informationElem.innerText = 'Fill both fields';
  } else {
    informationElem.innerText = 'Good';
    console.log("user:", user);
    console.log("Password:", password);
    checkRegister(user, password);
  }
});
