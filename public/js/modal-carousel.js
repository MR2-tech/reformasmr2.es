// Service Modal Integration with Lightbox
class ServiceLightbox {
  constructor() {
    this.serviceImages = {
      0: {
        // Renovaciones y Remodelaciones
        category: "Renovaciones y Remodelaciones",
        images: this.generateImageArray(),
      },
      1: {
        // Pintura y Decoración
        category: "Pintura y Decoración",
        images: this.generateImageArray(),
      },
      2: {
        // Reformas de Cocinas
        category: "Reformas de Cocinas",
        images: this.generateImageArray("images/projects/reforma-cocina/", 2),
      },
      3: {
        // Reformas de Baños
        category: "Reformas de Baños",
        images: this.generateImageArray("images/projects/reforma-banos/", 17),
      },
      4: {
        // Servicio de Urgencias
        category: "Servicio de Urgencias",
        images: this.generateImageArray(),
      },
      5: {
        // Diseño y Planificación
        category: "Diseño y Planificación",
        images: this.generateImageArray(),
      },
    };
  }

  generateImageArray(
    source = "images/projects/reforma-integral/",
    length = 11
  ) {
    return Array(length)
      .fill(0)
      .map(
        (_, index) =>
          `${source}${
            index < 9 ? "0".concat((index + 1).toString()) : index + 1
          }.jpeg`
      );
  }

  openServiceLightbox(serviceIndex) {
    const serviceData = this.serviceImages[serviceIndex];
    if (!serviceData) return;

    // Check if lightbox exists (it should be created by lightbox.js)
    const existingLightbox = document.getElementById("lightbox-modal");
    if (!existingLightbox) {
      console.error(
        "Lightbox not found. Make sure lightbox.js is loaded first."
      );
      return;
    }

    // Get lightbox elements
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxCounter = document.getElementById("lightbox-counter");
    const lightboxCategory = document.getElementById("lightbox-category");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");

    if (!lightboxModal || !lightboxImage) {
      console.error("Lightbox elements not found");
      return;
    }

    // Set up the lightbox for this service
    this.currentServiceIndex = serviceIndex;
    this.currentImageIndex = 0;
    this.images = serviceData.images.map((src, index) => ({
      src,
      alt: `${serviceData.category} ${index + 1}`,
    }));

    // Update lightbox content
    this.updateLightboxImage(lightboxImage, lightboxCounter, lightboxCategory);
    this.updateLightboxNavigation(lightboxPrev, lightboxNext);

    // Show lightbox
    lightboxModal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Set up event listeners for this session
    this.setupServiceEventListeners(
      lightboxClose,
      lightboxPrev,
      lightboxNext,
      lightboxModal,
      lightboxImage
    );
  }

  updateLightboxImage(imageEl, counterEl, categoryEl) {
    if (!this.images || this.images.length === 0) return;

    const currentImage = this.images[this.currentImageIndex];
    imageEl.src = currentImage.src;
    imageEl.alt = currentImage.alt;
    counterEl.textContent = `${this.currentImageIndex + 1} / ${
      this.images.length
    }`;
    categoryEl.textContent =
      this.serviceImages[this.currentServiceIndex].category;

    // Trigger animation
    imageEl.style.animation = "none";
    imageEl.offsetHeight; // Trigger reflow
    imageEl.style.animation = "lightboxImageIn 0.4s ease";
  }

  updateLightboxNavigation(prevBtn, nextBtn) {
    const showNav = this.images.length > 1;
    prevBtn.style.display = showNav ? "flex" : "none";
    nextBtn.style.display = showNav ? "flex" : "none";
  }

  nextImage(imageEl, counterEl, categoryEl) {
    this.currentImageIndex =
      this.currentImageIndex < this.images.length - 1
        ? this.currentImageIndex + 1
        : 0;
    this.updateLightboxImage(imageEl, counterEl, categoryEl);
  }

  prevImage(imageEl, counterEl, categoryEl) {
    this.currentImageIndex =
      this.currentImageIndex > 0
        ? this.currentImageIndex - 1
        : this.images.length - 1;
    this.updateLightboxImage(imageEl, counterEl, categoryEl);
  }

  closeLightbox(lightboxModal) {
    lightboxModal.classList.add("closing");
    setTimeout(() => {
      lightboxModal.classList.remove("active", "closing");
      document.body.style.overflow = "";
      this.cleanupEventListeners();
    }, 300);
  }

  setupServiceEventListeners(closeBtn, prevBtn, nextBtn, modal, imageEl) {
    // Remove any existing listeners first
    this.cleanupEventListeners();

    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxCounter = document.getElementById("lightbox-counter");
    const lightboxCategory = document.getElementById("lightbox-category");

    // Close button
    this.closeHandler = () => this.closeLightbox(modal);
    closeBtn.addEventListener("click", this.closeHandler);

    // Navigation buttons
    this.nextHandler = () =>
      this.nextImage(lightboxImage, lightboxCounter, lightboxCategory);
    this.prevHandler = () =>
      this.prevImage(lightboxImage, lightboxCounter, lightboxCategory);
    nextBtn.addEventListener("click", this.nextHandler);
    prevBtn.addEventListener("click", this.prevHandler);

    // Modal background click
    this.modalClickHandler = (e) => {
      if (e.target === modal) this.closeLightbox(modal);
    };
    modal.addEventListener("click", this.modalClickHandler);

    // Keyboard events
    this.keyHandler = (e) => {
      if (!modal.classList.contains("active")) return;
      switch (e.key) {
        case "Escape":
          this.closeLightbox(modal);
          break;
        case "ArrowLeft":
          this.prevImage(lightboxImage, lightboxCounter, lightboxCategory);
          break;
        case "ArrowRight":
          this.nextImage(lightboxImage, lightboxCounter, lightboxCategory);
          break;
      }
    };
    document.addEventListener("keydown", this.keyHandler);

    // Touch/swipe support
    let startX = 0;
    let endX = 0;

    this.touchStartHandler = (e) => {
      startX = e.touches[0].clientX;
    };
    this.touchEndHandler = (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.nextImage(lightboxImage, lightboxCounter, lightboxCategory);
        } else {
          this.prevImage(lightboxImage, lightboxCounter, lightboxCategory);
        }
      }
    };

    imageEl.addEventListener("touchstart", this.touchStartHandler);
    imageEl.addEventListener("touchend", this.touchEndHandler);
  }

  cleanupEventListeners() {
    const closeBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");
    const modal = document.getElementById("lightbox-modal");
    const imageEl = document.getElementById("lightbox-image");

    if (this.closeHandler && closeBtn) {
      closeBtn.removeEventListener("click", this.closeHandler);
    }
    if (this.nextHandler && nextBtn) {
      nextBtn.removeEventListener("click", this.nextHandler);
    }
    if (this.prevHandler && prevBtn) {
      prevBtn.removeEventListener("click", this.prevHandler);
    }
    if (this.modalClickHandler && modal) {
      modal.removeEventListener("click", this.modalClickHandler);
    }
    if (this.keyHandler) {
      document.removeEventListener("keydown", this.keyHandler);
    }
    if (this.touchStartHandler && imageEl) {
      imageEl.removeEventListener("touchstart", this.touchStartHandler);
    }
    if (this.touchEndHandler && imageEl) {
      imageEl.removeEventListener("touchend", this.touchEndHandler);
    }
  }
}

// Global service lightbox instance
window.serviceLightbox = null;

// Initialize service lightbox functionality
document.addEventListener("DOMContentLoaded", function () {
  // Wait a bit to ensure lightbox.js has initialized
  setTimeout(() => {
    window.serviceLightbox = new ServiceLightbox();

    // Add click event listeners to service cards
    const serviceCards = document.querySelectorAll(".single-services");
    serviceCards.forEach((card, index) => {
      card.style.cursor = "pointer";
      card.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Open the service lightbox
        if (window.serviceLightbox) {
          window.serviceLightbox.openServiceLightbox(index);
        }
      });

      // Add hover effect
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px)";
        this.style.transition = "transform 0.3s ease";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
      });
    });
  }, 100);
});
