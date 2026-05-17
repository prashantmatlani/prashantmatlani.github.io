
// assets/js/app.js

/* =========================================================
   SECTION REVEALS
========================================================= */

const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });

}, {
    threshold: 0.15
});

reveals.forEach(section => {
    revealObserver.observe(section);
});

/* =========================================================
   NAVBAR SHADOW
========================================================= */

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {

    if (window.scrollY > 30) {

        navbar.style.boxShadow = '0 8px 32px rgba(0,0,0,0.28)';

    } else {

        navbar.style.boxShadow = 'none';
    }
});

/* =========================================================
   CARD PARALLAX
========================================================= */

const cards = document.querySelectorAll('.glass-card');

cards.forEach(card => {

    card.addEventListener('mousemove', (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 6;
        const rotateX = ((y / rect.height) - 0.5) * -6;

        card.style.transform = `
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-4px)
        `;
    });

    card.addEventListener('mouseleave', () => {

        card.style.transform = 'translateY(0px)';
    });
});