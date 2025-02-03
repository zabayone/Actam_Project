import { getFirestore, doc, getDoc, updateDoc, collection } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { db } from './ConnectDB.js'; 


const usernamesCollection = collection(db, "Usernames");

function formatDateForFirebase(date) {
    return date.replace(/\//g, ':');
  }

async function syncDaysToFirebase(userData, docRef) {
    //console.log("Starting Firebase sync...");
    //console.log("day_array length:", day_array.length);
    //console.log("userData keys:", Object.keys(userData));

    // Verificar si day_array está vacío
    if (!day_array.length) {
        //console.log("Warning: day_array is empty!");
        return;
    }

    for (const element of day_array) {
        /*console.log("\nProcessing day:", {
            date: element.date,
            hasData: !!element.stringify(),
        });*/

        const day_date = element.date;
        const firebaseDate = formatDateForFirebase(day_date);
        const day_str = element.stringify();

        try {
            await updateDoc(docRef, {
                [firebaseDate]: day_str
            });
            //console.log(`Day ${day_date} updated in Firebase`);
        } catch (error) {
            console.error(`Error updating day ${day_date}:`, error);
        }
    }

    //console.log("Firebase sync completed");
}

const username = localStorage.getItem('username');
if (!username) {
    console.error("Username not found in localStorage");
} else {
    const docRef = doc(db, "Usernames", username);

    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            await syncDaysToFirebase(userData, docRef);
        } else {
            console.error("User document does not exist in Firebase");
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}