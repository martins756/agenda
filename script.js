const containerContatos = document.getElementById('container-contatos');
const formContato = document.getElementById('form-contato');

// URL da sua API MockAPI
const API_URL = 'https://68bed4719c70953d96edc4bb.mockapi.io/api/alunos';

// Buscar e exibir os contatos
const buscarContatos = () => {
  fetch(API_URL)
    .then(res => res.json())
    .then(dados => {
      containerContatos.innerHTML = '';
      dados.forEach(contato => {
        const card = `
          <article class="card-contato">
            <img src="${contato.foto}" alt="${contato.nome}">
            <h3>${contato.nome}</h3>
            <p><strong>Cidade:</strong> ${contato.cidade}</p>
            <p><strong>Telefone:</strong> ${contato.telefone}</p>
          </article>
        `;
        containerContatos.innerHTML += card;
      });
    })
    .catch(erro => {
      containerContatos.innerHTML = `<p>Erro ao carregar contatos.</p>`;
      console.error('Erro ao buscar contatos:', erro);
    });
};

// Adicionar novo contato
formContato.addEventListener('submit', (e) => {
  e.preventDefault();

  const novoContato = {
    nome: document.getElementById('nome').value,
    cidade: document.getElementById('cidade').value,
    telefone: document.getElementById('telefone').value,
    foto: document.getElementById('foto').value
  };

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(novoContato)
  })
    .then(res => res.json())
    .then(() => {
      buscarContatos(); // Atualiza a lista após adicionar
      formContato.reset(); // Limpa o formulário
    })
    .catch(erro => console.error('Erro ao adicionar contato:', erro));
});

// Inicializa
document.addEventListener('DOMContentLoaded', buscarContatos);
