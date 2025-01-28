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
        octaveUp:"Octave Up",
        octaveDown:"Octave Down",
        hide:"Hide",
        showKeyboard:"Show Keyboard",
        seeResults:"Check your results",
        results:"Results",
        categories: {
            intervals: {
                title: "Intervals",
                heading: "Train Your Intervals",
                description: "Learn to recognize intervals by ear and enhance your musical skills."
            },
            chords: {
                title: "Chords",
                heading: "Train Your Chords",
                description: "Identify chords and improve your harmonic understanding."
            },
            scales: {
                title: "Scales",
                heading: "Train Your Scales",
                description: "Practice scale recognition to sharpen your ear for melodies."
            },
            sandbox: {
                title: "Sandbox",
                heading: "Explore the Sandbox",
                description: "Experiment freely with various musical elements."
            },
            results: {
                title: "Results",
                heading: "Check Your Results",
                description: "View your progress and analyze your performance."
            },
            unknown: {
                title: "Unknown Category",
                heading: "Category Not Found",
                description: "The selected category does not exist."
            }
        },
        sandPrompt: "Personalise your Level", 
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
        octaveUp:"Ottava Su",
        octaveDown:"Ottava Giù",
        hide:"Nascondi",
        showKeyboard:"Mostra la Tastiera",
        seeResults:"Controlla i tuoi risultati",
        results:"Risultati",
        categories: {
            intervals: {
                title: "Intervalli",
                heading: "Allena i Tuoi Intervalli",
                description: "Impara a riconoscere gli intervalli a orecchio e migliora le tue abilità musicali."
            },
            chords: {
                title: "Accordi",
                heading: "Allena i Tuoi Accordi",
                description: "Identifica gli accordi e migliora la tua comprensione armonica."
            },
            scales: {
                title: "Scale",
                heading: "Allena le Tue Scale",
                description: "Esercitati nel riconoscimento delle scale per affinare il tuo orecchio musicale."
            },
            sandbox: {
                title: "Sandbox",
                heading: "Esplora il Sandbox",
                description: "Sperimenta liberamente con vari elementi musicali."
            },
            results: {
                title: "Risultati",
                heading: "Verifica i Tuoi Risultati",
                description: "Visualizza i tuoi progressi e analizza le tue prestazioni."
            },
            unknown: {
                title: "Categoria Sconosciuta",
                heading: "Categoria Non Trovata",
                description: "La categoria selezionata non esiste."
            }
        },
        sandPrompt: "Personaliizza il tuo Livello", 
    }
};

//map for the translation
const categoryMap = {
    "0": "intervals",
    "1": "chords",
    "2": "scales",
    "3": "sandbox",
    "4": "results"
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

function setLanguage(language) {
    // Save the selected language to localStorage
    localStorage.setItem('language', language);

    // Get all elements with the "data-translate" attribute
    const elements = document.querySelectorAll('[data-translate]');

    // Loop through each element and set the text based on the selected language
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
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

    // Update dynamic sections (welcome message, category info, etc.)
    updateWelcomeMessage(language);
    updateCategoryInfo(language);
}

//Function to translate category informations
function updateCategoryInfo(language) {
    const category = localStorage.getItem('category');
    const categoryKey = categoryMap[category]; // Map category ID to key

    const categoryTranslations = translations[language]?.categories || {};
    const categoryTitle = document.getElementById('categoryTitle');
    const categoryHeading = document.getElementById('categoryHeading');
    const categoryDescription = document.getElementById('categoryDescription');

    if (categoryKey && categoryTranslations[categoryKey]) {
        categoryTitle.textContent = categoryTranslations[categoryKey].title;
        categoryHeading.textContent = categoryTranslations[categoryKey].heading;
        categoryDescription.textContent = categoryTranslations[categoryKey].description;
    } else {
        const unknownCategory = categoryTranslations.unknown;
        categoryTitle.textContent = unknownCategory?.title || "Unknown Category";
        categoryHeading.textContent = unknownCategory?.heading || "Category Not Found";
        categoryDescription.textContent = unknownCategory?.description || "The selected category does not exist.";
    }
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
    const category = localStorage.getItem('category');
    const level = urlParams.get('level');

    // Elements to update
    const categoryTitle = document.getElementById('categoryTitle');
    const categoryHeading = document.getElementById('categoryHeading');
    const categoryDescription = document.getElementById('categoryDescription');


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
                categoryTitle.textContent = 'Vocal Intervals';
                categoryHeading.textContent = 'Train Your Vocal Intervals';
                categoryDescription.textContent = 'Improve your singing skills by training vocal intervals.';
                break;
            case '4':
                categoryTitle.textContent = 'Results';
                categoryHeading.textContent = 'Check your results';
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
});

// function for the slider of the results page
sliderElements.forEach(element => {
    element.addEventListener('click', () => {
        // Remove the 'active' class from all elements
        sliderElements.forEach(el => el.classList.remove('active'));

        // Add the 'active' class to the clicked element
        element.classList.add('active');
    });
});

function toggleSection(id) {
    const content = document.getElementById(id);
    content.classList.toggle('expanded');
    const btn = content.previousElementSibling;
    btn.textContent = btn.textContent.includes('▼') ? 
        btn.textContent.replace('▼', '▲') : 
        btn.textContent.replace('▲', '▼');
}

function customLevel(){
    const button=document.getElementById('custom-btn');
    button.addEventListener('click',()=>{
        window.location.href = `sandbox.html`;
    });
}

function checkbox(){
    const intervalSelector = document.getElementById('intervalSelector');
    const chordSelector = document.getElementById('chordSelector');
    const scaleSelector = document.getElementById('scaleSelector');
    //show the checkbox of the selected category
    const category = localStorage.getItem('category');
    switch(category){
        case '0':
            intervalSelector.style.display = 'block';
            chordSelector.style.display = 'none';
            scaleSelector.style.display = 'none';
            break;

        case '1':
            chordSelector.style.display = 'block';
            intervalSelector.style.display = 'none';
            scaleSelector.style.display = 'none';
            break;

        case '2':
            scaleSelector.style.display = 'block';
            chordSelector.style.display = 'none';
            intervalSelector.style.display = 'none';
            break;

        case '3':
            intervalSelector.style.display = 'block';
            chordSelector.style.display = 'none';
            scaleSelector.style.display = 'none';
            break;

        default:
            break;
    }
}