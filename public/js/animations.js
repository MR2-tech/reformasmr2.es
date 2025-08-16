function textAnimation(selector, textArray) {
  const textWrapper = document.querySelector(selector);
  let currentIndex = 0;

  function setupText(text) {
    textWrapper.textContent = text;
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );

    // Set initial state for new letters
    const letters = textWrapper.querySelectorAll(".letter");
    letters.forEach((letter) => {
      letter.style.opacity = "0";
      letter.style.transform = "translateX(40px)";
    });
  }

  function createAnimation() {
    // Create the timeline animation
    const timeline = anime.createTimeline({
      loop: false, // We'll handle looping manually
      onComplete: () => {
        // Move to next text
        currentIndex = (currentIndex + 1) % textArray.length;
        setupText(textArray[currentIndex]);

        // Small delay before starting next animation
        setTimeout(() => {
          createAnimation();
        }, 300);
      },
    });

    // Add the first animation step
    timeline.add(`${selector} .letter`, {
      translateX: [40, 0],
      translateZ: 0,
      opacity: [0, 1],
      ease: "outExpo",
      duration: 600,
      delay: anime.stagger(15, { start: 500 }),
    });

    // Add the second animation step
    timeline.add(`${selector} .letter`, {
      translateX: [0, -30],
      opacity: [1, 0],
      ease: "inExpo",
      duration: 1200,
      delay: anime.stagger(10, { start: 100 }),
    });
  }

  // Initialize with first text
  setupText(textArray[0]);
  createAnimation();
}

const subtitleTexts = [
  "Cada proyecto es único. Ofrecemos soluciones a medida para tu hogar o negocio.",
  "Transformamos tus ideas en realidad con nuestro equipo experto en construcción.",
];
const servicesTexts = [
  "Construimos confianza, transformamos espacios: conoce nuestras especialidades.",
  "Descubre todo lo que podemos hacer por tu hogar o negocio con nuestra amplia gama de servicios profesionales",
];

const projectsTexts = [
  "Una muestra de nuestra experiencia y dedicación en cada proyecto de construcción.",
  "Conoce los proyectos que reflejan nuestro compromiso con la innovación y la satisfacción del cliente.",
];

textAnimation("#main-subtitle", subtitleTexts);
textAnimation("#our-services", servicesTexts);
textAnimation("#our-projects", projectsTexts);

// scroll animation
function initServicesAnimation(selector) {
  const serviceCards = document.querySelectorAll(selector);

  if (serviceCards.length === 0) {
    console.warn("No service cards found");
    return;
  }

  // Set initial state for all cards
  serviceCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px) scale(0.9)";
  });

  // Create intersection observer for scroll detection
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: "0px 0px -20px 0px", // Trigger slightly before element enters viewport
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const cardIndex = Array.from(serviceCards).indexOf(card);

        // Animate the card when it comes into view
        anime.animate(card, {
          opacity: [0, 1],
          translateY: [50, 0],
          scale: [0.9, 1],
          duration: 800,
          delay: cardIndex * 100, // Stagger animation
          ease: "outExpo",
          onComplete: () => {
            // Add subtle hover animation after initial animation
            card.addEventListener("mouseenter", () => {
              anime.animate(card, {
                scale: 1.05,
                duration: 300,
                ease: "outQuad",
              });
            });

            card.addEventListener("mouseleave", () => {
              anime.animate(card, {
                scale: 1,
                duration: 300,
                ease: "outQuad",
              });
            });
          },
        });

        // Stop observing this card after animation
        observer.unobserve(card);
      }
    });
  }, observerOptions);

  // Start observing each service card
  serviceCards.forEach((card) => {
    observer.observe(card);
  });
}

// Initialize animations when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initServicesAnimation(".single-services");
});

// Fallback initialization if DOMContentLoaded already fired
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initServicesAnimation(".single-services");
  });
} else {
  initServicesAnimation(".single-services");
}
