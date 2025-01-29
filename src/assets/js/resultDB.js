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



