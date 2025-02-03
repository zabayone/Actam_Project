import { getFirestore, doc, getDoc, setDoc, collection, updateDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { db } from './ConnectDB.js'; 

const usernamesCollection = collection(db, "Usernames");


document.addEventListener('lvlUpdate', (event) => {
    //console.log("GameEnd recibido en leaderboard!", event.detail);
  updateLevel(event.detail.lvl)
});

async function updateLevel(newlevel) {
  if (localStorage.getItem('username')) {//If a user is already stored
    const user = localStorage.getItem('username')
    const docRef = doc(usernamesCollection, user);  
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {//Exist on database (we update to the best version)
      //console.log(newlevel);
      const levelData = docSnap.data().levels;
      levelData[parseInt(localStorage.getItem('category'))]=newlevel;
      await updateDoc(docRef, {
        levels: levelData
      });
    }

    else{//Exists locally but not on the database
      localStorage.removeItem('username')
      //console.log('removed')
    }
  }
}