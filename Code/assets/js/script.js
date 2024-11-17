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
function setLanguage(lang) {
    if (lang === 'en') {
        alert('Language set to English');
    } else if (lang === 'it') {
        alert('Lingua impostata su Italiano');
    }
}
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
