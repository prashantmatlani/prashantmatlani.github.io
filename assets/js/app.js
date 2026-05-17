
// assets/js/app.js

/* =========================================================
   assets/js/app.js
   Motion orchestration + reveal system
   ========================================================= */

(() => {

  /* =========================================================
     SCROLL REVEALS
     ========================================================= */

  const revealItems =
    document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

        }

      });

    },

    {
      threshold: 0.12
    }
  );

  revealItems.forEach((item) => observer.observe(item));

  /* =========================================================
     PARALLAX
     ========================================================= */

  const hero = document.querySelector(".hero");

  window.addEventListener("scroll", () => {

    const scrollY = window.scrollY;

    if (hero) {

      hero.style.transform =
        `translateY(${scrollY * 0.08}px)`;
    }

  });

  /* =========================================================
     CARD ATMOSPHERIC RESPONSE
     ========================================================= */

  const cards = document.querySelectorAll(
    ".research-card, .capability-card, .glass-card"
  );

  cards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

      const rect = card.getBoundingClientRect();

      const x =
        e.clientX - rect.left;

      const y =
        e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX =
        ((y - centerY) / centerY) * -3;

      const rotateY =
        ((x - centerX) / centerX) * 3;

      card.style.transform = `
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-6px)
      `;

    });

    card.addEventListener("mouseleave", () => {

      card.style.transform = `
        perspective(1200px)
        rotateX(0deg)
        rotateY(0deg)
        translateY(0px)
      `;

    });

  });

  /* =========================================================
     NAVBAR BACKGROUND
     ========================================================= */

  const navbar =
    document.querySelector(".navbar");

  window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

      navbar.classList.add("navbar-active");

    } else {

      navbar.classList.remove("navbar-active");

    }

  });

})();