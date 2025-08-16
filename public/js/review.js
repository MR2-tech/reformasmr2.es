// Star rating interaction
const stars = document.querySelectorAll(".star-rating input");
const ratingText = document.getElementById("ratingText");
const ratingTexts = {
  1: "Muy insatisfecho",
  2: "Insatisfecho",
  3: "Neutral",
  4: "Satisfecho",
  5: "Muy satisfecho",
};

stars.forEach((star) => {
  star.addEventListener("change", function () {
    const rating = this.value;
    ratingText.textContent = ratingTexts[rating];
    ratingText.classList.add("selected");
  });
});

// Character counter
const textarea = document.getElementById("description");
const charCount = document.getElementById("charCount");

textarea.addEventListener("input", function () {
  const count = this.value.length;
  charCount.textContent = count;

  if (count > 250) {
    charCount.style.color = "#e6185e";
  } else {
    charCount.style.color = "#6d6d6d";
  }
});

// Form validation enhancement
const form = document.getElementById("reviewForm");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", function (e) {
  submitBtn.innerHTML = '<i class="lni lni-spinner"></i> Enviando...';
  submitBtn.disabled = true;
});
