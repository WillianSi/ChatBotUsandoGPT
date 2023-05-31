const axios = require('axios'); // Importa a biblioteca Axios para fazer solicitações HTTP

const apiKey = 'sua_chave_API'; // Chave de API fornecida pelo Language Studio da OpenAI
const apiUrl = 'https://api.openai.com/v1/models'; // URL do endpoint da API da OpenAI

axios
  .get(apiUrl, {
    headers: {
      'Content-Type': 'application/json', // Define o tipo de conteúdo da solicitação como JSON
      'Authorization': `Bearer ${apiKey}` // Define a chave de autenticação fornecida pela OpenAI
    }
  })
  .then((response) => {
    // Manipula a resposta bem-sucedida da API
    const modelIds = response.data.data.map(item => item.id); // Obtém uma lista dos IDs dos modelos retornados na resposta
    console.log('Model IDs:', modelIds); // Exibe os IDs dos modelos
  })
  .catch((error) => {
    // Manipula qualquer erro ocorrido durante a solicitação
    console.log('Error status:', error.response.status); // Exibe o status do erro
    console.log('Error data:', error.response.data); // Exibe os dados do erro retornados pela API
    console.log('Error headers:', error.response.headers); // Exibe os cabeçalhos da resposta de erro
  });