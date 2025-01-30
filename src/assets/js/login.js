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



var day_array = [];

async function loadDays() {
  day_array = [];
  
  let i = 0;
  let str = "Day-" + i.toString();
  let dayExists = localStorage.getItem(str);
  
  while (dayExists) {
      const dayContainer = await loadSingleDay(i);
      day_array.push(dayContainer);
      
      i++;
      str = "Day-" + i.toString();
      dayExists = localStorage.getItem(str);
  }
}

async function loadSingleDay(index) {
  // console.log(`Loading day ${index}`);
  return new DayContainer(index);
}

async function syncDaysToFirebase(userData, docRef) {
  console.log("Starting Firebase sync...");
  console.log("day_array length:", day_array.length);
  console.log("userData keys:", Object.keys(userData));
  
  if (!day_array.length) {
      console.log("Warning: day_array is empty!");
      return;
  }

  for (const element of day_array) {
      console.log("\nProcessing day:", {
          date: element.date,
          hasData: !!element.stringify(),
          existsInUserData: element.date in userData
      });

      const day_date = element.date;
      const firebaseDate = formatDateForFirebase(day_date);
      
      if (!(firebaseDate in userData)) {
          const day_str = element.stringify();
          console.log(`Attempting to add day ${day_date}`);
          try {
              await updateDoc(docRef, {
                  [firebaseDate]: formatDateForFirebase(day_str)
              });
              console.log(`Day ${day_date} added to Firebase`);
          } catch (error) {
              console.error(`Error adding day ${day_date}:`, error);
          }
      } else {
          console.log(`Day ${day_date} already in Firebase`);
      }
  }
  
  console.log("Firebase sync completed");
}

async function syncDaysFromFirebase(userData) {
  console.log("Starting sync from Firebase...");
  
  for (const [date, data] of Object.entries(userData)) {
      if (date === 'password' || date === 'levels' || date === 'scores') continue;
      
      const localData = formatDateForLocal(data);
      console.log(`Found new day in Firebase: ${formatDateForLocal(date)}`);
      
      try {
          const newDay = new DayContainer(null);
          newDay.fromString(localData);
          day_array.push(newDay);
          newDay.localStore();
          console.log(`Day ${date} added to local storage`);
      } catch (error) {
          console.error(`Error adding day ${date} to local storage:`, error);
      }
  }
  
  console.log("Firebase to local sync completed");
}

function clearLocalDays() {
  console.log("Starting complete cleanup of day data...");
  
  // Primero, encontrar el número más alto de día
  let maxDay = -1;
  for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('Day-')) {
          const dayNum = parseInt(key.split('-')[1]);
          maxDay = Math.max(maxDay, dayNum);
      }
  }

  // Eliminar sistemáticamente todos los datos de cada día
  for (let day = 0; day <= maxDay; day++) {
      // Eliminar la entrada principal del día
      localStorage.removeItem(`Day-${day}`);
      console.log(`Removed Day-${day}`);

      // Eliminar todos los datos asociados
      for (let x = 0; x < 3; x++) {
          for (let y = 0; y < 12; y++) { // Asumiendo máximo 12 entradas por tipo
              localStorage.removeItem(`${day}/int/${x}-${y}`);
              localStorage.removeItem(`${day}/arr/${x}-${y}`);
              localStorage.removeItem(`${day}/scal/${x}-${y}`);
              localStorage.removeItem(`${day}/voc/${x}-${y}`);
          }
      }
      console.log(`Removed all data for day ${day}`);
  }

  // Limpiar el array en memoria
  day_array = [];
  console.log("Complete cleanup finished");
}

function formatDateForFirebase(date) {
  return date.replace(/\//g, ':');
}

function formatDateForLocal(date) {
  return date.replace(/:/g, '/');
}



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

    const userData = docSnap.data();
    await loadDays();
    await syncDaysToFirebase(userData,docRef);
    await syncDaysFromFirebase(userData);
  }
  else{
    console.log("El documento no existe.");
  }
}

async function updateLocalData(user){
  const docRef = doc(usernamesCollection, user);  
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    clearLocalDays();
    const levelData = docSnap.data().levels;
    const scoreData = docSnap.data().scores;
    for(let i=0;i<4;i++){
      localStorage.setItem(lvlInfo[i],levelData[i])
    }
    for(let i=0;i<3;i++){
      localStorage.setItem(minigamesInfo[i],scoreData[i])
    }
    const userData = docSnap.data();
    await loadDays();
    await syncDaysFromFirebase(userData);
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

    const userData = docSnap.data();
    await loadDays();
    await syncDaysToFirebase(userData,docRef);
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
    await compareData(user)
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
        console.log(user);
        

        if (localStorage.getItem('username')) {
          const oldUser=localStorage.getItem('username');
          console.log(oldUser)
          await storeData(oldUser);
          await updateLocalData(user)
        }
        else{await compareData(user)}

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
        levels: ['1','1','1','1'],
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



