// Importa las funciones necesarias de Firebase
import { collection, query, orderBy, limit, getDocs, where, doc, getDoc, setDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { db } from './ConnectDB.js';  // Conexión a la base de datos, si ya tienes configurada la conexión.
const currentUser = localStorage.getItem('username');
console.log(currentUser)

let leaderboardCollection

if (localStorage.getItem('selectedGuessTheNote') === 'true') {
    console.log("El usuario eligió 'Guess the Note'");
    leaderboardCollection = collection(db, "GuessNote");
}
else if (localStorage.getItem('selectedGuitar') === 'true') {
    console.log("El usuario eligió 'FlappyGuitar'");
    leaderboardCollection = collection(db, "Leaderboard");
}
//to avoid the program thinking it's not ddeclared. No actual use

//const leaderboardCollection = collection(db, "Leaderboard");

const numberShown = 5;

console.log("Listener para 'gameEnd' registrado.");
document.addEventListener('gameEnd', (event) => {
    console.log("GameEnd recibido en leaderboard!", event.detail);
    // Aquí ya puedes llamar a tus funciones
    createLeaderboardStructure();
    updateScore(event.detail.score).then(() => {
        renderLeaderboard();
    });
});

function createLeaderboardStructure() {
        const container = document.createElement('div');
        container.id = 'leaderboard-container'; // Añadir ID
    
    container.innerHTML = `
        <table id="leaderboard-table" border="1">
            <thead>
                <tr>
                    Leaderboard
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    `;
    
    document.body.appendChild(container);
}
// Obtener los N puntajes más altos
async function getLeaderboardData() {
    const leaderboardQuery = query(leaderboardCollection, orderBy('score', 'desc'));
    
    const querySnapshot = await getDocs(leaderboardQuery);
    const scores = [];
    querySnapshot.forEach((doc) => {
        scores.push({ username: doc.data().username, score: doc.data().score });
        const data = doc.data();
    });
    return scores;
    }
    
    // Mostrar la tabla con las puntuaciones
async function renderLeaderboard() {
    const leaderboardTableBody = document.querySelector('#leaderboard-table tbody');
    
    try {
        const allScores = await getLeaderboardData(); // Obtener todos los datos una vez
        const topScores = allScores.slice(0, numberShown); // Filtrar las N primeras puntuaciones
        const userIndex = allScores.findIndex((entry) => entry.username === currentUser); // Posición del usuario actual
        leaderboardTableBody.innerHTML = ''; // Limpia cualquier contenido previo
    
        // Rellenar la tabla con las puntuaciones principales
        topScores.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> <div class="position">${index + 1}</div> </td>
            <td>${entry.username}</td>
            <td>${entry.score}</td>
        `;
        leaderboardTableBody.appendChild(row);
        });
    
        // Añadir la fila del usuario si no está en el top N
        if (userIndex >= numberShown) {
        const userScore = allScores[userIndex];
        const userRow = document.createElement('tr');
        userRow.classList.add('current-user-row');
        userRow.innerHTML = `
            <td><div class="positionUser">${userIndex + 1}</div></div></td>
            <td>${currentUser}</td>
            <td>${userScore.score}</td>
        `;
        userRow.style.fontWeight = 'bold'; // Destacar la fila del usuario actual
        leaderboardTableBody.appendChild(userRow);
        }
    } catch (error) {
        console.error('Error al obtener las puntuaciones:', error);
    }
    }
    
    // Ejecutar cuando se cargue la página
    document.addEventListener('DOMContentLoaded', renderLeaderboard);

async function updateScore(newScore) {
    const userRef = doc(leaderboardCollection, currentUser); // Usamos la colección existente
    
    try {
        const userDoc = await getDoc(userRef);
    
        if (userDoc.exists()) {
        const existingScore = userDoc.data().score;
        if (newScore > existingScore) {
            await updateDoc(userRef, { score: newScore });
            console.log('Puntuación actualizada a:', newScore);
        } else {
            console.log('La nueva puntuación no es mayor, no se actualiza.');
        }
        } else {
        await setDoc(userRef, { username: currentUser, score: newScore });
        console.log('Nueva puntuación registrada:', newScore);
        }
        renderLeaderboard();
    } catch (error) {
        console.error('Error al actualizar la puntuación:', error);
    }
}


