import { getFirestore, doc, getDoc, updateDoc, collection } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { db } from './ConnectDB.js';  // Conexión a la base de datos

// Crea una referencia a la colección 'Usernames'
const usernamesCollection = collection(db, "Usernames");

function formatDateForFirebase(date) {
    return date.replace(/\//g, ':');
  }

async function syncDaysToFirebase(userData, docRef) {
    console.log("Starting Firebase sync...");
    console.log("day_array length:", day_array.length);
    console.log("userData keys:", Object.keys(userData));

    // Verificar si day_array está vacío
    if (!day_array.length) {
        console.log("Warning: day_array is empty!");
        return;
    }

    // Recorrer cada día en day_array
    for (const element of day_array) {
        console.log("\nProcessing day:", {
            date: element.date,
            hasData: !!element.stringify(),
        });

        const day_date = element.date;
        const firebaseDate = formatDateForFirebase(day_date);
        const day_str = element.stringify();

        try {
            // Actualizar el documento en Firebase con los datos del día
            await updateDoc(docRef, {
                [firebaseDate]: day_str
            });
            console.log(`Day ${day_date} updated in Firebase`);
        } catch (error) {
            console.error(`Error updating day ${day_date}:`, error);
        }
    }

    console.log("Firebase sync completed");
}

// Obtener el nombre de usuario desde localStorage
const username = localStorage.getItem('username');
if (!username) {
    console.error("Username not found in localStorage");
} else {
    // Crear una referencia al documento del usuario en Firebase
    const docRef = doc(db, "Usernames", username);

    try {
        // Obtener los datos del usuario desde Firebase
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            // Sincronizar los días con Firebase
            await syncDaysToFirebase(userData, docRef);
        } else {
            console.error("User document does not exist in Firebase");
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}