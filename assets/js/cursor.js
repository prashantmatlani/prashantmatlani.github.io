

// assets/js/cursor.js

/* =========================================================
   assets/js/cursor.js
   Magnetic atmospheric cursor system
   ========================================================= */

(() => {
  
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
	document.querySelector(".cursor-glow")?.remove();
  }
  
  const glow = document.querySelector(".cursor-glow");

  if (!glow) return;

  let mouseX = 0;
  let mouseY = 0;

  let currentX = 0;
  let currentY = 0;

  let scale = 1;

  const hoverTargets = document.querySelectorAll(
    "a, button, .research-card, .capability-card"
  );

  document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  hoverTargets.forEach((el) => {

    el.addEventListener("mouseenter", () => {

      scale = 1.8;

      glow.classList.add("cursor-active");

    });

    el.addEventListener("mouseleave", () => {

      scale = 1;

      glow.classList.remove("cursor-active");

    });

  });

  function animate() {

    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;

    glow.style.transform = `
      translate3d(
        ${currentX - 120}px,
        ${currentY - 120}px,
        0
      )
      scale(${scale})
    `;

    requestAnimationFrame(animate);
  }

  animate();

})();