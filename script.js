// URL do endpoint personalizado fornecido pela OpenAI
const url = 'https://api.openai.com/v1/completions';

// Chave de assinatura fornecida pela OpenAI
const apiKey = 'sua_chave_API';

// Referências aos elementos da interface do usuário
const messageList = document.querySelector("#message-list");
const messageInput = document.querySelector("#message-input");
const sendButton = document.querySelector("#send-button");
const clearButton = document.querySelector("#clear-button");

// Função que envia a pergunta para o endpoint personalizado e exibe a resposta na interface do usuário
async function sendMessage() {
  // Verifica se já há uma pergunta sendo processada
  if (messageInput.disabled) {
    return;
  }

  // Obtém a pergunta digitada pelo usuário
  const question = messageInput.value;

  // Verifica se a pergunta não está vazia
  if (question.trim().length === 0) {
    return;
  }

  // Desabilita o campo de entrada e o botão de envio
  disableInput();

  // Limpa o campo de entrada
  messageInput.value = "";

  // Exibe a pergunta na interface do usuário
  const questionItem = document.createElement("li");
  questionItem.textContent = question;
  questionItem.classList.add("sent");
  questionItem.classList.add("chatbox__entrada"); // Adiciona a classe CSS "chatbox__message"
  messageList.appendChild(questionItem);

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Define o tipo de conteúdo da solicitação como JSON
      'Authorization': `Bearer ${apiKey}` // Define a chave de autenticação fornecida pela OpenAI
    },
    body: JSON.stringify({
      model: 'text-davinci-003', // Define o modelo de linguagem a ser usado
      prompt: question, // Insira o valor da pergunta aqui
      temperature: 0.5, // Define o nível de criatividade ou aleatoriedade da resposta (0.0 a 1.0)
      max_tokens: 100 // Define o número máximo de tokens na resposta
    })
  })
    .then((response) => response.text())
    .then((data) => {
      // Exibe a resposta na interface do usuário
      const responseItem = document.createElement("li");
      responseItem.textContent = JSON.parse(data).choices[0].text;
      responseItem.classList.add("received");
      responseItem.classList.add("chatbox__message"); // Adiciona a classe CSS "chatbox__message"
      messageList.appendChild(responseItem);
      // Rola para o final após receber a resposta
      scrollToBottom();
    })
    .catch(error => console.log(error));

  // Habilita o campo de entrada e o botão de envio novamente
  enableInput();

  // Rola para o final após enviar a mensagem
  scrollToBottom();

  // Mantém o campo de texto selecionado
  messageInput.focus();
}

// Função que desabilita o campo de entrada e o botão de envio
function disableInput() {
  messageInput.disabled = true;
  sendButton.disabled = true;
  sendButton.innerHTML = '<img src="/img/load.gif" alt="" style="width: 16px; height: 16px;">'; // Altera a imagem do botão para "/img/load.gif"
}

// Função que habilita o campo de entrada e o botão de envio
function enableInput() {
  messageInput.disabled = false;
  sendButton.disabled = false;
  sendButton.innerHTML = '<img src="/img/enviar.png" alt="">'; // Altera a imagem do botão para "/img/enviar.png"
}

// Função para rolar para o final da lista de mensagens
function scrollToBottom() {
  messageList.scrollTop = messageList.scrollHeight;
}

// Função para limpar a interface do usuário
function clearUI() {
  // Remove todos os elementos da lista de mensagens
  while (messageList.firstChild) {
    messageList.firstChild.remove();
  }
}

// Adiciona um evento de clique ao botão "Limpar"
clearButton.addEventListener("click", clearUI);

// Adiciona um evento de clique ao botão "Enviar"
sendButton.addEventListener("click", sendMessage);

// Adiciona um evento de tecla ao campo de entrada
messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});