// Importa las funciones necesarias de Firebase
import { collection, query, orderBy, limit, getDocs, where, doc, getDoc, setDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { db } from '../assets/js/ConnectDB.js';  // Conexión a la base de datos, si ya tienes configurada la conexión.
const currentUser = localStorage.getItem('currentUser');

// Crea una referencia a la colección 'Usernames'
const leaderboardCollection = collection(db, "Leaderboard");

const numberShown = 5;

document.getElementById('information').innerText=currentUser;


// Obtener los N puntajes más altos
async function getLeaderboardData() {
    const leaderboardQuery = query(leaderboardCollection, orderBy('score', 'desc'));
    const querySnapshot = await getDocs(leaderboardQuery);
    
    const scores = [];
    querySnapshot.forEach((doc) => {
        scores.push({ username: doc.data().username, score: doc.data().score });
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
            <td>${index + 1}</td>
            <td>${entry.username}</td>
            <td>${entry.score}</td>
        `;
        leaderboardTableBody.appendChild(row);
        });
    
        // Añadir la fila del usuario si no está en el top N
        if (userIndex >= numberShown) {
        const userScore = allScores[userIndex];
        const userRow = document.createElement('tr');
        userRow.innerHTML = `
            <td>${userIndex + 1}</td>
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

document.getElementById('update-score-btn').addEventListener('click', () => {
    const newScoreInput = document.getElementById('new-score');
    const newScore = parseInt(newScoreInput.value, 10);

    if (isNaN(newScore) || newScore <= 0) {
        alert('Por favor, introduce una puntuación válida.');
        return;
    }

    updateScore(newScore);
});