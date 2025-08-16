class Lightbox {
  constructor() {
    this.isOpen = false;
    this.currentIndex = 0;
    this.images = [];
    this.category = "";
    this.init();
  }

  init() {
    this.createLightboxHTML();
    this.bindEvents();
  }

  createLightboxHTML() {
    const lightboxHTML = `
      <div id="lightbox-modal" class="lightbox-modal">
        <div class="lightbox-content">
          <button class="lightbox-close" id="lightbox-close">
            <i class="lni lni-close"></i>
          </button>
          
          <button class="lightbox-nav lightbox-prev" id="lightbox-prev">
            <i class="lni lni-chevron-left"></i>
          </button>
          
          <button class="lightbox-nav lightbox-next" id="lightbox-next">
            <i class="lni lni-chevron-right"></i>
          </button>
          
          <div class="lightbox-category" id="lightbox-category"></div>
          
          <img class="lightbox-image" id="lightbox-image" src="" alt="">
          
          <div class="lightbox-counter" id="lightbox-counter"></div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", lightboxHTML);

    // Get references to elements
    this.modal = document.getElementById("lightbox-modal");
    this.image = document.getElementById("lightbox-image");
    this.counter = document.getElementById("lightbox-counter");
    this.categoryEl = document.getElementById("lightbox-category");
    this.closeBtn = document.getElementById("lightbox-close");
    this.prevBtn = document.getElementById("lightbox-prev");
    this.nextBtn = document.getElementById("lightbox-next");
  }

  bindEvents() {
    // Close lightbox events
    this.closeBtn.addEventListener("click", () => this.close());
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) this.close();
    });

    // Navigation events
    this.prevBtn.addEventListener("click", () => this.prev());
    this.nextBtn.addEventListener("click", () => this.next());

    // Keyboard events
    document.addEventListener("keydown", (e) => {
      if (!this.isOpen) return;

      switch (e.key) {
        case "Escape":
          this.close();
          break;
        case "ArrowLeft":
          this.prev();
          break;
        case "ArrowRight":
          this.next();
          break;
      }
    });

    // Add click event to all carousel images
    document.addEventListener("click", (e) => {
      const projectImage = e.target.closest(".project-image img");
      if (projectImage) {
        e.preventDefault();
        this.openFromCarousel(projectImage);
      }
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    this.image.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    this.image.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        // Minimum swipe distance
        if (diff > 0) {
          this.next();
        } else {
          this.prev();
        }
      }
    });
  }

  openFromCarousel(clickedImage) {
    // Find the carousel container
    const carousel = clickedImage.closest(".projects-carousel");
    if (!carousel) return;

    // Get all images from this carousel
    const carouselImages = carousel.querySelectorAll(".project-image img");
    this.images = Array.from(carouselImages).map((img) => ({
      src: img.src,
      alt: img.alt,
    }));

    // Find the clicked image index
    this.currentIndex = Array.from(carouselImages).indexOf(clickedImage);

    // Get category from the carousel
    const categoryBadge = carousel
      .closest(".carousel-section")
      .querySelector(".project-category-badge");
    this.category = categoryBadge ? categoryBadge.textContent : "";

    this.open();
  }

  open() {
    this.isOpen = true;
    this.modal.classList.add("active");
    document.body.style.overflow = "hidden";
    this.updateImage();
    this.updateNavigation();
  }

  close() {
    this.modal.classList.add("closing");
    setTimeout(() => {
      this.isOpen = false;
      this.modal.classList.remove("active", "closing");
      document.body.style.overflow = "";
    }, 300);
  }

  prev() {
    this.currentIndex =
      this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1;
    this.updateImage();
  }

  next() {
    this.currentIndex =
      this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
    this.updateImage();
  }

  updateImage() {
    if (this.images.length === 0) return;

    const currentImage = this.images[this.currentIndex];
    this.image.src = currentImage.src;
    this.image.alt = currentImage.alt;
    this.counter.textContent = `${this.currentIndex + 1} / ${
      this.images.length
    }`;
    this.categoryEl.textContent = this.category;

    // Trigger animation
    this.image.style.animation = "none";
    this.image.offsetHeight; // Trigger reflow
    this.image.style.animation = "lightboxImageIn 0.4s ease";
  }

  updateNavigation() {
    // Show/hide navigation based on number of images
    const showNav = this.images.length > 1;
    this.prevBtn.style.display = showNav ? "flex" : "none";
    this.nextBtn.style.display = showNav ? "flex" : "none";
  }
}

// Initialize lightbox when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  new Lightbox();
});
