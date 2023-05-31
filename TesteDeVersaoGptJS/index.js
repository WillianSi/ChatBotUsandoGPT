const axios = require("axios"); // Importa a biblioteca Axios para fazer solicitações HTTP

const apiKey = 'sua_chave_API'; // Chave de API fornecida pelo Language Studio da OpenAI
const apiUrl = 'https://api.openai.com/v1/completions'; // URL do endpoint da API da OpenAI

const prompt = 'Fale sobre naruto'; // Prompt ou pergunta que será enviada ao modelo de linguagem

// Faz uma solicitação POST para a API da OpenAI usando a biblioteca Axios
axios
  .post(
    apiUrl,
    {
      model: 'text-davinci-003', // Define o modelo de linguagem a ser usado
      prompt, // Define o texto da pergunta ou prompt
      temperature: 0.5, // Define o nível de criatividade ou aleatoriedade da resposta (0.0 a 1.0)
      max_tokens: 100 // Define o número máximo de tokens na resposta
    }, {
      headers: {
        'Content-Type': 'application/json', // Define o tipo de conteúdo da solicitação como JSON
        'Authorization': `Bearer ${apiKey}` // Define a chave de autenticação fornecida pela OpenAI
      }
    })
  .then((response) => {
    // Manipula a resposta bem-sucedida da API
    console.log(response.data.choices[0].text); // Exibe o texto da resposta gerada pelo modelo
  })
  .catch((error) => {
    // Manipula qualquer erro ocorrido durante a solicitação
    console.log(error);
  });