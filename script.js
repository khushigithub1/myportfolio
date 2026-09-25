// ==============================
// Typing Animation
// ==============================

const roles = [
    "Data Scientist",
    "Machine Learning Engineer",
    "Data Analyst",
    "AI Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const typingEl = document.getElementById("typing");

function typeEffect() {
    if (!typingEl) return;
    const current = roles[roleIndex];

    if (!deleting) {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
            deleting = true;
            setTimeout(typeEffect, 1800);
            return;
        }
    } else {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeEffect, deleting ? 55 : 100);
}

typeEffect();


// ==============================
// Enter Portfolio Button
// ==============================

const enterBtn = document.getElementById("enterBtn");

enterBtn.addEventListener("click", () => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "0";
    setTimeout(() => {
        window.location.href = "home.html";
    }, 500);
});


// ==============================
// Fade in on load
// ==============================

window.addEventListener("load", () => {
    document.body.style.transition = "opacity 0.6s ease";
    document.body.style.opacity = "1";
});

document.body.style.opacity = "0";
