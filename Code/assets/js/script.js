// Translation dictionary for multiple languages
const translations = {
    en: {
        title: "Actam Project",
        loginBtn: "Login",
        registerBtn: "Register",
        trainPrompt: "What would you like to train today?",
        vocalTraining: "Vocal Training",
        earTraining: "Ear Training",
        arcade: "Arcade",
        createAccount: "Create an Account",
        alreadyHaveAccount: "Already have an account?",
        login: "Login",
        loginHeader: "Login",
        usernameLabel: "Username:",
        passwordLabel: "Password:",
        authentication: "Authentication",
        guest: "Guest",
        welcomeBack: "Welcome back, {username}!", // Added dynamic username welcome message
        intervals: "Intervals",
        scales: "Scales",
        chords: "Chords",
        sandbox: "Sandbox",
        level: "Level {number}",
    },
    it: {
        title: "Progetto Actam",
        loginBtn: "Accedi",
        registerBtn: "Registrati",
        trainPrompt: "Cosa vuoi allenare oggi?",
        vocalTraining: "Allenamento Vocale",
        earTraining: "Allenamento Uditivo",
        arcade: "Arcade",
        createAccount: "Crea un Account",
        alreadyHaveAccount: "Hai già un account?",
        login: "Accedi",
        loginHeader: "Accedi",
        usernameLabel: "Nome utente:",
        passwordLabel: "Password:",
        authentication: "Autenticazione",
        guest: "Ospite",
        welcomeBack: "Bentornato, {username}!", // Added dynamic username welcome message
        intervals: "Intervalli",
        scales: "Scale",
        chords: "Accordi",
        sandbox: "Sandbox",
        level: "Livello {number}"
    }
};

// JavaScript for handling language changes and updating text content
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners for the language buttons
    const languageButtons = document.querySelectorAll('.language-btn');
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the language code from the button's data-language attribute
            const language = button.getAttribute('onclick').match(/'([^']+)'/)[1]; // Extract language from the onclick handler
            setLanguage(language); // Call the setLanguage function
        });
    });

    // Set default language to English
    setLanguage(localStorage.getItem('language') || 'en');
});

// Function to set the language
function setLanguage(language) {
    // Save the selected language to localStorage
    localStorage.setItem('language', language);

    // Get all elements with the "data-translate" attribute
    const elements = document.querySelectorAll('[data-translate]');
    
    // Loop through each element and set the text based on the selected language
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            // For the level buttons, handle the dynamic translation
            if (key === 'level') {
                for (let i = 1; i <= 9; i++) {
                    const levelButton = document.querySelector(`[data-level='${i}']`);
                    if (levelButton) {
                        levelButton.textContent = translations[language].level.replace("{number}", i);
                    }
                }
            } else {
                element.textContent = translations[language][key];
            }
        }
    });

    // Update the language immediately on the page
    updateWelcomeMessage(language);
}

// Function to update the welcome message dynamically
function updateWelcomeMessage(language) {
    const username = localStorage.getItem('username'); // Retrieve the username from localStorage

    const welcomeMessage = username ? translations[language].welcomeBack.replace("{username}", username) : translations[language].guest;
    document.getElementById('information').innerText = welcomeMessage;
}

// Event listener for the level buttons
document.addEventListener('DOMContentLoaded', () => {
    const levelButtons = document.querySelectorAll('.level-btn');
    levelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const level = button.getAttribute('data-level');
            // Redirect to the level page with the level number in the query string
            window.location.href = '/Code/ear-training/level.html?level=' + level;
        });
    });
});

// Check if the user is logged in and update the header information accordingly
document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    const language = localStorage.getItem('language') || 'en';

    // Set the welcome message dynamically based on whether the user is logged in
    const welcomeMessage = username ? translations[language].welcomeBack.replace("{username}", username) : translations[language].guest;
    document.getElementById('information').innerText = welcomeMessage;
});