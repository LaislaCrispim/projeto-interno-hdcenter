// Voltar ao início ao clicar na logo
document.addEventListener("DOMContentLoaded", function () {
  const logo = document.querySelector(".logo a");
  if (logo) {
    logo.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "index.html";
    });
  }

  // Curtir (fictício)
  const likeButtons = document.querySelectorAll(".like-button");
  likeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const countSpan = btn.querySelector(".like-count");
      let count = parseInt(countSpan.textContent, 10);
      countSpan.textContent = count + 1;
    });
  });
});
