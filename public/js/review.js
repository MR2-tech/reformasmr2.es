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

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  
  submitBtn.innerHTML = '<i class="lni lni-spinner"></i> Enviando...';
  submitBtn.disabled = true;

  try {
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      // If successful, redirect to thank you page
      window.location.href = '/thank-you';
    } else {
      const errorData = await response.json();
      
      // Show error message
      showErrorMessage(errorData.error || 'Error al enviar la reseña');
      
      // Reset button
      submitBtn.innerHTML = '<i class="lni lni-checkmark-circle"></i> Enviar reseña';
      submitBtn.disabled = false;
    }
  } catch (error) {
    showErrorMessage('Error de conexión. Por favor, inténtalo de nuevo.');
    
    // Reset button
    submitBtn.innerHTML = '<i class="lni lni-checkmark-circle"></i> Enviar reseña';
    submitBtn.disabled = false;
  }
});

function showErrorMessage(message) {
  // Remove existing error messages
  const existingError = document.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }

  // Create error message element
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message alert alert-danger mt-3';
  errorDiv.innerHTML = `
    <i class="lni lni-warning"></i>
    <strong>Error:</strong> ${message}
  `;

  // Insert error message before the submit button
  const submitRow = document.querySelector('.row:last-child');
  submitRow.parentNode.insertBefore(errorDiv, submitRow);

  // Auto-hide after 10 seconds
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.remove();
    }
  }, 10000);
}
