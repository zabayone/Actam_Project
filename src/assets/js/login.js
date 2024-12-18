// Importa las funciones necesarias de Firebase
import { getFirestore, doc, getDoc, setDoc, collection, updateDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { db } from './ConnectDB.js';  // Conexión a la base de datos, si ya tienes configurada la conexión.

// Crea una referencia a la colección 'Usernames'
const usernamesCollection = collection(db, "Usernames");


/*const user = localStorage.getItem('username')
const docRef = doc(usernamesCollection, user);  
const docSnap = await getDoc(docRef);
const userData = docSnap.data().levels;*/



//Manage local storing

let lvlInfo = ['lvlInterval', 'lvlChord', 'lvlScale', 'lvlEar'];
let minigamesInfo = ['game1Score', 'game2Score', 'game3Score'];

/*console.log(userData[1])
localStorage.setItem(lvlInfo[1],3)
console.log(localStorage.getItem(lvlInfo[1]))*/

lvlInfo.forEach(element => {
  if (!localStorage.getItem(element)) {
    localStorage.setItem(element, 1); 
  } 
});

minigamesInfo.forEach(element => {
  if (!localStorage.getItem(element)) {
    localStorage.setItem(element, 0); 
  }
});

async function compareData(user){
    const docRef = doc(usernamesCollection, user);  
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const levelData = docSnap.data().levels;
      for(let i=0;i<4;i++){
        if(levelData[i]<localStorage.getItem(lvlInfo[i])){
          levelData[i]=localStorage.getItem(lvlInfo[i])
        }
        else{localStorage.setItem(lvlInfo[i],levelData[i])} 
      }
      await updateDoc(docRef, {
        levels: levelData
      });
      const scoreData = docSnap.data().scores;
      for(let i=0;i<3;i++){
        if(scoreData[i]<localStorage.getItem(minigamesInfo[i])){
          scoreData[i]=localStorage.getItem(minigamesInfo[i])
        }
        else{localStorage.setItem(minigamesInfo[i],scoreData[i])} 
      }
      await updateDoc(docRef, {
        scores: scoreData
      });
    }
    else{
      console.log("El documento no existe.");
    }
}

async function updateLocalData(user){
  const docRef = doc(usernamesCollection, user);  
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const levelData = docSnap.data().levels;
    const scoreData = docSnap.data().scores;
    for(let i=0;i<4;i++){
      localStorage.setItem(lvlInfo[i],levelData[i])
    }
    for(let i=0;i<3;i++){
      localStorage.setItem(minigamesInfo[i],scoreData[i])
    }
  }
  else{
    console.log("El documento no existe.");
  }
}

async function storeData(user){
  const docRef = doc(usernamesCollection, user);  
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const levelData = docSnap.data().levels;
    for(let i=0;i<4;i++){
      levelData[i]=localStorage.getItem(lvlInfo[i])
    }
    await updateDoc(docRef, {
      levels: levelData
    });
    const scoreData = docSnap.data().scores;
    for(let i=0;i<3;i++){
      scoreData[i]=localStorage.getItem(minigamesInfo[i])
    }
    await updateDoc(docRef, {
      scores: scoreData
    });
  }
  else{
    console.log("El documento no existe.");
  }
}

if (localStorage.getItem('username')) {//If a user is already stored
  const user = localStorage.getItem('username')
  const docRef = doc(usernamesCollection, user);  
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {//Exist on database (we update to the best version)
    console.log(user)
    compareData(user)
  }
  else{//Exists locally but not on the database
    localStorage.removeItem('username')
    console.log('removed')
  }
}


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
        

        if (localStorage.getItem('username')) {
          setTimeout(() => {
            storeData(localStorage.getItem('username'));
          }, 1000);
          updateLocalData(user)
        }
        else{compareData(user)}

        localStorage.setItem('username', user); 
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
        password: password,
        levels: ['3','3','3','3'],
        scores: ['0','0','0'],
        
      });
      informationElem.style.display = 'block';
      informationElem.innerText = "Registration successful!";
      if (localStorage.getItem('username')) {
        storeData(localStorage.getItem('username'))
        updateLocalData(user)
      }
      else {
        compareData(user)
      }
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



