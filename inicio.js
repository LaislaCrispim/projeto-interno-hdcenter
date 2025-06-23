function criarPost(tema, conteudoTexto, imagemURL = null) {
  const feed = document.querySelector('.feed');
  const novoPost = document.createElement('div');
  novoPost.classList.add('post');
  novoPost.setAttribute('data-tema', tema);

  novoPost.innerHTML = `
    <div class="post-header">
      <img class="profile-pic" src="https://randomuser.me/api/portraits/men/10.jpg" alt="Foto de perfil">
      <div class="profile-info">
        <strong>@usuario.teste</strong>
        <span>${tema}</span>
      </div>
    </div>
    ${imagemURL ? `<img class="post-img" src="${imagemURL}" alt="Imagem da publicação">` : ''}
    <div class="post-body">
      <h4 class="post-title">Nova Publicação</h4>
      <p class="caption">${conteudoTexto}</p>
    </div>
    <button class="like-button">❤️ Curtir <span class="like-count">0</span></button>
  `;

  feed.prepend(novoPost);
}

// Evento para todos os botões de postagem
document.querySelectorAll('.post-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tema = btn.dataset.tema;
    const textarea = document.querySelector('.post-box textarea');
    const texto = textarea.value.trim();
    const imagemInput = document.getElementById('imagemPostagem');
    const imagemArquivo = imagemInput.files[0];

    // ✅ Corrigido: Validação antes de criar a postagem
    if (texto === '') {
      alert('Digite algum conteúdo antes de postar.');
      return;
    }

    // ✅ Criar post com imagem ou sem imagem
    if (imagemArquivo) {
      const reader = new FileReader();
      reader.onload = function (e) {
        criarPost(tema, texto, e.target.result);
      };
      reader.readAsDataURL(imagemArquivo);
    } else {
      criarPost(tema, texto);
    }

    // Limpa campos
    textarea.value = '';
    imagemInput.value = '';
  });
});

// === FILTRAR POSTS POR TEMA DO MENU LATERAL ===
document.querySelectorAll('.sidebar li').forEach(item => {
  item.addEventListener('click', () => {
    const filtro = item.getAttribute('data-filter');
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
      const tema = post.getAttribute('data-tema');

      if (filtro === 'todos' || tema === filtro) {
        post.style.display = 'block';
      } else {
        post.style.display = 'none';
      }
    });

    // opcional: destacar item ativo
    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('ativo'));
    item.classList.add('ativo');
  });
});

const chatUsers = document.querySelectorAll('.chat-user');
const chatPopupsContainer = document.getElementById('chat-popups');
let openChats = [];

chatUsers.forEach(user => {
  user.addEventListener('click', () => {
    const username = user.getAttribute('data-user');
    const img = user.getAttribute('data-img');

    // Verifica se já está aberto
    if (openChats.includes(username)) return;

    // Cria o pop-up de chat
    chatUsers.forEach(user => {
  user.addEventListener('click', () => {
    const username = user.getAttribute('data-user');
    const img = user.getAttribute('data-img');

    if (openChats.includes(username)) return;

    const popup = document.createElement('div');
    popup.classList.add('chat-popup');
    popup.setAttribute('data-user', username);
    popup.style.right = `${(openChats.length * 260) + 220}px`;

    popup.innerHTML = `
      <div class="chat-header">
        ${username}
        <span class="chat-close">✖</span>
      </div>
      <div class="chat-body">
        <div class="messages" style="height: 100px; overflow-y: auto; margin-bottom: 5px;">
          <p><em>Conversa com ${username}</em></p>
        </div>
        <div class="chat-input">
          <label for="file-${username}" title="Anexar imagem" style="cursor:pointer;">
            📎
          </label>
          <input type="file" id="file-${username}" style="display: none;" />
          <input type="text" placeholder="Escreva uma mensagem..." style="flex: 1; padding: 5px;" />
          <button class="send-btn" style="padding: 5px 10px; background-color: #04c804; color: white; border: none; border-radius: 5px;">Enviar</button>
        </div>
      </div>
    `;

    popup.querySelector('.chat-close').addEventListener('click', () => {
      popup.remove();
      openChats = openChats.filter(u => u !== username);
      reorganizarPopups();
    });

    popup.querySelector('.send-btn').addEventListener('click', () => {
      const input = popup.querySelector('input[type="text"]');
      const messages = popup.querySelector('.messages');
      if (input.value.trim() !== "") {
        const msg = document.createElement('p');
        msg.textContent = "Você: " + input.value;
        messages.appendChild(msg);
        input.value = "";
        messages.scrollTop = messages.scrollHeight;
      }
    });

    chatPopupsContainer.appendChild(popup);
    openChats.push(username);
  });
});

    // Fecha o popup
    popup.querySelector('.chat-close').addEventListener('click', () => {
      popup.remove();
      openChats = openChats.filter(user => user !== username);
      reorganizarPopups();
    });

    chatPopupsContainer.appendChild(popup);
    openChats.push(username);
  });
});

function reorganizarPopups() {
  const popups = document.querySelectorAll('.chat-popup');
  popups.forEach((popup, index) => {
    popup.style.right = `${(index * 260) + 220}px`;
  });
}
