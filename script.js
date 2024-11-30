// Símbolos para as slots
const symbols = ['👦', '🧝‍♂️', '🧙‍♂️', '👸', '👑'];

// Sons para as interações
const spinSound = document.getElementById('spinSound');
const winSound = document.getElementById('winSound');

// Inicializa o valor do depósito
let deposit = 0;
const depositElement = document.getElementById('deposit-value');

// Função para iniciar o giro das slots
function startSpin() {
  const slot1 = document.getElementById('slot1');
  const slot2 = document.getElementById('slot2');
  const slot3 = document.getElementById('slot3');
  const winMessage = document.getElementById("win-message");

  // Ocultar a mensagem de vitória no início do giro
  winMessage.style.display = 'none';

  // Duração do giro da roleta (2 segundos)
  const spinDuration = 2000; // 2 segundos
  const startTime = Date.now();

  // Reproduzir o som de girar
  spinSound.currentTime = 0; // Reinicia o áudio para garantir que comece do início
  spinSound.play();

  // Função para girar as slots até o tempo acabar
  function spinAnimation() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;

    if (elapsedTime < spinDuration) {
      // Girar as slots com símbolos aleatórios durante o giro
      slot1.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      slot2.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      slot3.textContent = symbols[Math.floor(Math.random() * symbols.length)];

      // Continuar a animação
      requestAnimationFrame(spinAnimation);
    } else {
      // Após 2 segundos, parar o giro e verificar vitória
      stopSpin();
    }
  }

  // Iniciar a animação de girar
  spinAnimation();
}

// Função para finalizar o giro das slots
function stopSpin() {
  const slot1 = document.getElementById('slot1');
  const slot2 = document.getElementById('slot2');
  const slot3 = document.getElementById('slot3');
  const winMessage = document.getElementById('win-message');

  spinSound.pause(); // Para o som de giro
  spinSound.currentTime = 0;

  if (Math.random() < 0.8) {
    // 80% de chance de vitória
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    slot1.textContent = randomSymbol;
    slot2.textContent = randomSymbol;
    slot3.textContent = randomSymbol;

    deposit += 10; // Atualiza o valor do depósito
    depositElement.textContent = `$${deposit}`;

    // Exibe mensagem de vitória e toca o som
    winMessage.style.display = 'block';
    winSound.currentTime = 0;
    winSound.play();
  } else {
    // Exibe símbolos aleatórios caso não ganhe
    slot1.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    slot2.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    slot3.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  }

  // Reativa o botão de girar
  const spinButton = document.querySelector('.spin-button');
  spinButton.disabled = false;
}

// Configura o botão de giro
const spinButton = document.querySelector('.spin-button');
spinButton.addEventListener('click', () => {
  spinButton.disabled = true; // Desativa o botão durante o giro
  startSpin();
});

// Funções relacionadas ao modal de registro
const registerModal = document.getElementById('register-modal');
const registerButton = document.getElementById('register-modal-btn');
const registerFormButton = document.getElementById('register-btn');
const closeModalButton = document.getElementById('close-modal');

// Abre o modal de registro
function openRegisterModal() {
  registerModal.style.display = 'flex';
}

// Fecha o modal de registro
function closeRegisterModal() {
  registerModal.style.display = 'none';
}

// Configura eventos para os botões do modal
registerFormButton.addEventListener('click', openRegisterModal);
registerButton.addEventListener('click', openRegisterModal);
closeModalButton.addEventListener('click', closeRegisterModal);

// Fecha o modal ao clicar fora do conteúdo
window.addEventListener('click', (event) => {
  if (event.target === registerModal) {
    closeRegisterModal();
  }
});

// Configura o formulário de registro
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    alert('Cadastro realizado com sucesso! Você está sendo redirecionado...');

    // Fecha o modal e redireciona
    registerModal.style.display = 'none';
    window.location.href = 'pagina_principal.html'; // Substitua pelo link real
  });
});
