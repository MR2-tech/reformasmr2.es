(function () {
  const showHidePassButton = document.querySelector("#get-review-token-button");
  const passInput = document.querySelector("#secret-key");

  if (showHidePassButton && passInput) {
    showHidePassButton.addEventListener("click", (e) => {
      e.preventDefault();

      const isText = passInput.type === "text";

      if (isText) {
        passInput.type = "password";
        showHidePassButton.textContent = "Mostrar";
      } else {
        passInput.type = "text";
        showHidePassButton.textContent = "Ocultar";
      }
    });
  }
})();
