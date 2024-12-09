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
        arcade: "Arcade",
        guessTheNote: "Guess the note",
        play:"Play",    
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
        level: "Livello {number}",
        arcade: "arcade",
        guessTheNote: "Indovina la nota",
        play:"Suona", 
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

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the category from the URL of the current page
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category'); // Get the category from the query string

    if (!category) {
        console.error('Category is missing from the URL.');
        return; // Exit if the category is not specified
    }

    // Add event listeners to all level buttons
    const levelButtons = document.querySelectorAll('.level-btn');

    levelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const level = button.getAttribute('data-level'); // Get level number
            
            // Debugging logs to verify correct behavior
            console.log('Redirecting to level:', level);
            console.log('Category:', category);

            // Redirect to the level.html with category and level in the query string
            window.location.href = `level.html?category=${category}&level=${level}`;
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


// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const level = urlParams.get('level');

    // Elements to update
    const categoryTitle = document.getElementById('categoryTitle');
    const categoryHeading = document.getElementById('categoryHeading');
    const categoryDescription = document.getElementById('categoryDescription');
    const levelDescription = document.getElementById('levelDescription'); // For level-specific content

    // Update the page content dynamically based on the category
    if (category) {
        switch (category.toLowerCase()) {
            case '0':
                categoryTitle.textContent = 'Intervals';
                categoryHeading.textContent = 'Train Your Intervals';
                categoryDescription.textContent = 'Learn to recognize intervals by ear and enhance your musical skills.';
                break;
            case '1':
                categoryTitle.textContent = 'Chords';
                categoryHeading.textContent = 'Train Your Chords';
                categoryDescription.textContent = 'Identify chords and improve your harmonic understanding.';
                break;
            case '2':
                categoryTitle.textContent = 'Scales';
                categoryHeading.textContent = 'Train Your Scales';
                categoryDescription.textContent = 'Practice scale recognition to sharpen your ear for melodies.';
                break;
            case '3':
                categoryTitle.textContent = 'Sandbox';
                categoryHeading.textContent = 'Explore the Sandbox';
                categoryDescription.textContent = 'Experiment freely with various musical elements.';
                break;
            default:
                categoryTitle.textContent = 'Unknown Category';
                categoryHeading.textContent = 'Category Not Found';
                categoryDescription.textContent = 'The selected category does not exist.';
        }
    } else {
        categoryTitle.textContent = 'No Category Selected';
        categoryHeading.textContent = 'Please Select a Category';
        categoryDescription.textContent = 'Use the main page to choose a training category.';
    }

    // Update the level information dynamically based on the level
    if (level) {
        levelDescription.textContent = `You have selected Level ${level}. Now proceed with the tasks for this level.`;
    } else if (levelDescription) {
        levelDescription.textContent = 'No level selected.';
    }
});


//level.html script
// Get the URL parameters (level number)
const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get('level');

// Update the page based on the level parameter
const levelDescription = document.getElementById('levelDescription');

// Example: You can display different information or load different content based on the level
if (level) {
    levelDescription.textContent = `You have selected Level ${level}. Now proceed with the tasks for this level.`;
} else {
    levelDescription.textContent = 'No level selected.';
}

