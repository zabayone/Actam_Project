const translations = {
    en: {
        title: "Actam Project",
        loginBtn: "Login",
        registerBtn: "Register",
        trainPrompt: "What would you like to train today?",
        vocalTraining: "Vocal Training",
        earTraining: "Ear Training",
        arcade: "Arcade", // Fixed this key to match the button for "Arcade"
        createAccount: "Create an Account",
        alreadyHaveAccount: "Already have an account?",
        login: "Login",
        loginHeader: "Login",
        usernameLabel: "Username:",
        passwordLabel: "Password:",
        authentication: "Autentication",
        guest: "Guest",
    },
    it: {
        title: "Progetto Actam",
        loginBtn: "Accedi",
        registerBtn: "Registrati",
        trainPrompt: "Cosa vuoi allenare oggi?",
        vocalTraining: "Allenamento Vocale",
        earTraining: "Allenamento Uditivo",
        arcade: "Arcade", // Fixed this key to match the button for "Arcade"
        createAccount: "Crea un Account",
        alreadyHaveAccount: "Hai già un account?",
        login: "Accedi",
        loginHeader: "Accedi",
        usernameLabel: "Nome utente:",
        passwordLabel: "Password:",
        authentication: "Autenticazione",
        guest: "Ospite",
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

    // Set default language
    setLanguage('en');
});

// Function to set the language
function setLanguage(language) {
    // Get all elements with the "data-translate" attribute
    const elements = document.querySelectorAll('[data-translate]');
    
    // Loop through each element and set the text based on the selected language
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners to level buttons
    const levelButtons = document.querySelectorAll('.level-btn');
    levelButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the level data from the button's data-level attribute
            const level = button.getAttribute('data-level');
            
            // Redirect to the level page with the level number in the query string
            window.location.href = '/Code/ear-training/level.html?level=' + level;
        });
    });
});
