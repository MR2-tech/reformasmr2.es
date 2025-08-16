class MultiCarousel {
  constructor(carouselId) {
    this.carouselId = carouselId;
    this.track = document.getElementById(`carousel-track-${carouselId}`);
    this.slides = this.track
      ? this.track.querySelectorAll(".carousel-slide")
      : [];
    this.nextBtn = document.getElementById(`next-btn-${carouselId}`);
    this.prevBtn = document.getElementById(`prev-btn-${carouselId}`);
    this.dotsContainer = document.getElementById(`carousel-dots-${carouselId}`);

    this.currentIndex = 0;
    this.slidesPerView = this.getSlidesPerView();
    this.totalSlides = this.slides.length;
    this.maxIndex = Math.max(0, this.totalSlides - this.slidesPerView);
    this.autoPlayInterval = null;

    this.init();
  }

  getSlidesPerView() {
    if (window.innerWidth >= 1200) return 4;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  createDots() {
    if (!this.dotsContainer) return;

    this.dotsContainer.innerHTML = "";
    const numDots = this.maxIndex + 1;

    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => this.goToSlide(i));
      this.dotsContainer.appendChild(dot);
    }
  }

  updateDots() {
    if (!this.dotsContainer) return;

    const dots = this.dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentIndex);
    });
  }

  updateCarousel() {
    if (!this.track) return;

    const slideWidth = 100 / this.slidesPerView;
    const translateX = -this.currentIndex * slideWidth;
    this.track.style.transform = `translateX(${translateX}%)`;
    this.updateDots();
  }

  goToSlide(index) {
    this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
    this.updateCarousel();
  }

  nextSlide() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back to start
    }
    this.updateCarousel();
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.maxIndex; // Loop to end
    }
    this.updateCarousel();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => this.nextSlide(), 4000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  handleResize() {
    const newSlidesPerView = this.getSlidesPerView();
    if (newSlidesPerView !== this.slidesPerView) {
      this.slidesPerView = newSlidesPerView;
      this.maxIndex = Math.max(0, this.totalSlides - this.slidesPerView);
      this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
      this.createDots();
      this.updateCarousel();
    }
  }

  setupEventListeners() {
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => {
        this.nextSlide();
        this.stopAutoPlay();
        this.startAutoPlay();
      });
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => {
        this.prevSlide();
        this.stopAutoPlay();
        this.startAutoPlay();
      });
    }

    if (this.track) {
      // Pause autoplay on hover
      this.track.addEventListener("mouseenter", () => this.stopAutoPlay());
      this.track.addEventListener("mouseleave", () => this.startAutoPlay());

      // Touch/swipe support for mobile
      let startX = 0;
      let currentX = 0;
      let isDragging = false;

      this.track.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        this.stopAutoPlay();
      });

      this.track.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
      });

      this.track.addEventListener("touchend", () => {
        if (!isDragging) return;
        isDragging = false;

        const diffX = startX - currentX;
        if (Math.abs(diffX) > 50) {
          if (diffX > 0) {
            this.nextSlide();
          } else {
            this.prevSlide();
          }
        }
        this.startAutoPlay();
      });
    }
  }

  init() {
    if (this.slides.length === 0) return;

    this.createDots();
    this.updateCarousel();
    this.setupEventListeners();
    this.startAutoPlay();
  }

  destroy() {
    this.stopAutoPlay();
  }
}

// Initialize all carousels
document.addEventListener("DOMContentLoaded", function () {
  const carousels = [];

  // Find all carousel containers and initialize them
  const carouselTracks = document.querySelectorAll('[id^="carousel-track-"]');
  carouselTracks.forEach((track) => {
    const carouselId = track.id.replace("carousel-track-", "");
    carousels.push(new MultiCarousel(carouselId));
  });

  // Handle window resize for all carousels
  window.addEventListener("resize", () => {
    carousels.forEach((carousel) => carousel.handleResize());
  });

  // Store carousels globally for potential cleanup
  window.carousels = carousels;
});
