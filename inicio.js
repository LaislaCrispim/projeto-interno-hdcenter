// Voltar ao início ao clicar na logo
document.addEventListener("DOMContentLoaded", function () {
  const logo = document.querySelector(".logo a");
  if (logo) {
    logo.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "inicio.html";
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

<script>
let chatCount = 0;

function openChat(username, avatar) {
  if (document.getElementById(`chat-${username}`)) return; // evita duplicado

  const chatBox = document.createElement("div");
  chatBox.className = "chat-popup";
  chatBox.id = `chat-${username}`;
  chatBox.style.right = `${280 + (chatCount * 310)}px`;

  chatBox.innerHTML = `
    <div class="chat-header" onclick="toggleChat('${username}')">
      <span>@${username}</span>
      <div>
        <button class="chat-close" onclick="closeChat(event, '${username}')">x</button>
      </div>
    </div>
    <div class="chat-body" id="body-${username}">
      <p><strong>@${username}:</strong> Olá! Precisa de ajuda?</p>
    </div>
    <div class="chat-input">
      <input type="text" placeholder="Digite uma mensagem...">
      <button>Enviar</button>
    </div>
  `;

  document.body.appendChild(chatBox);
  chatCount++;
}

function toggleChat(username) {
  const chat = document.getElementById(`chat-${username}`);
  chat.classList.toggle("chat-minimized");
}

function closeChat(event, username) {
  event.stopPropagation();
  const chat = document.getElementById(`chat-${username}`);
  if (chat) chat.remove();
  chatCount--;
}
</script>

