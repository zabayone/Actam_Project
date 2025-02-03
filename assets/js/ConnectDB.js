import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, doc, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

// DB SETUP

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCnIRvU2nGB4OnQhKOBLfz6feoM2qup21Y",
    authDomain: "usarnames-313c5.firebaseapp.com",
    projectId: "usarnames-313c5",
    storageBucket: "usarnames-313c5.firebasestorage.app",
    messagingSenderId: "660074645723",
    appId: "1:660074645723:web:9d621b3e1a855228c464fe",
    measurementId: "G-7KRGJQSLE9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);



