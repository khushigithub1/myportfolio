// ==============================
// Typing Animation
// ==============================

const roles = [
    "ML Engineer",
    "Data Analyst",
    "AI Enthusiast",
    "Python Developer"
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

    setTimeout(typeEffect, deleting ? 60 : 110);
}

typeEffect();


// ==============================
// Theme Toggle (Light / Dark)
// ==============================

const themeBtn = document.getElementById("theme-btn");
const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-mode");
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeBtn.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    const isLight = body.classList.contains("light-mode");
    themeBtn.innerHTML = isLight
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem("theme", isLight ? "light" : "dark");
});


// ==============================
// Hamburger Menu (Mobile)
// ==============================

const hamburger    = document.getElementById("hamburger");
const mobileNav    = document.getElementById("mobile-nav");
const mobileClose  = document.getElementById("mobile-nav-close");

function openMobileNav() {
    mobileNav.classList.add("open");
    document.body.style.overflow = "hidden";
    hamburger.innerHTML = '<i class="fa-solid fa-xmark"></i>';
}

function closeMobileNav() {
    mobileNav.classList.remove("open");
    document.body.style.overflow = "";
    hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
}

hamburger.addEventListener("click", () => {
    mobileNav.classList.contains("open") ? closeMobileNav() : openMobileNav();
});

mobileClose.addEventListener("click", closeMobileNav);

// Close when any nav link is clicked
document.querySelectorAll("#mobile-nav .nav-link").forEach(link => {
    link.addEventListener("click", closeMobileNav);
});


// ==============================
// Navbar Scroll Effect
// ==============================

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
    updateActiveLink();
    toggleBackToTop();
});


// ==============================
// Active Nav Link on Scroll
// ==============================

function updateActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");
        const link = document.querySelector(`.nav-link[href="#${id}"]`);

        if (link) {
            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
                link.classList.add("active");
            }
        }
    });
}


// ==============================
// Smooth Scroll for Nav Links
// ==============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});


// ==============================
// Back to Top Button
// ==============================

const backToTop = document.getElementById("backToTop");

function toggleBackToTop() {
    if (window.scrollY > 400) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
}

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// ==============================
// Scroll Reveal Animation
// ==============================

const revealEls = document.querySelectorAll(
    ".skill-category, .project-card, .timeline-item, .edu-card, .contact-wrapper"
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => {
    el.classList.add("reveal");
    observer.observe(el);
});


// ==============================
// Contact Form (mailto fallback)
// ==============================

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name    = document.getElementById("name").value.trim();
    const email   = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    const mailto = `mailto:akankshasrivastav004@gmail.com`
        + `?subject=${encodeURIComponent(subject)}`
        + `&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

    window.location.href = mailto;
});


// ==============================
// Certificate Lightbox
// ==============================
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.cert-images img').forEach(img => {
    img.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});

// clicking the whole cert-images area (the overlay) also opens lightbox for single-image cards
document.querySelectorAll('.cert-images--single').forEach(wrap => {
    wrap.style.cursor = 'zoom-in';
});

function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
    document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });


// ==============================
// Fade-in on Load
// ==============================
document.documentElement.classList.add('loaded');
