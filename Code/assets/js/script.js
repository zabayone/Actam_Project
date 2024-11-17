
const translations = {
    en: {
        title: "Actam Project",
        loginBtn: "Login",
        registerBtn: "Register",
        trainPrompt: "What would you like to train today?",
        vocalTraining: "Vocal Training",
        earTraining: "Ear Training",
        createAccount: "Create an Account",
        registerBtn: "Register",
        alreadyHaveAccount: "Already have an account?",
        login: "Login",
        loginHeader: "Login",
        usernameLabel: "Username:",
        passwordLabel: "Password:"
    },
    it: {
        title: "Progetto Actam",
        loginBtn: "Accedi",
        registerBtn: "Registrati",
        trainPrompt: "Cosa vuoi allenare oggi?",
        vocalTraining: "Allenamento Vocale",
        earTraining: "Allenamento Uditivo",
        createAccount: "Crea un Account",
        registerBtn: "Registrati",
        alreadyHaveAccount: "Hai già un account?",
        login: "Accedi",
        loginHeader: "Accedi",
        usernameLabel: "Nome utente:",
        passwordLabel: "Password:"
    }
};

// JavaScript for Login Modal and Language Selector
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');

    // Open modal
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });
});

// Function to handle language change (optional functionality)
function setLanguage(language) {
    // Get all elements with the "data-translate" attribute
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
}

// Default language is English
setLanguage('en');
// Open Login Modal
function openLoginModal() {
    document.getElementById("loginModal").style.display = "block";
    document.getElementById("registerModal").style.display = "none"; // Close registration modal
}

// Open Register Modal
function openRegisterModal() {
    document.getElementById("registerModal").style.display = "block";
    document.getElementById("loginModal").style.display = "none"; // Close login modal
}

// Close Modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}
