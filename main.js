// API --------------------------------------------
var baseUrl = "https://pokeapi.co/api/v2/pokemon/";

// Get Elements --------------------------------------------
var buscaInput = getElement(".busca-input"),
      botaoInput = getElement(".botao-busca"),
      container = getElement(".pokemon"),
      msgErro = getElement(".erro");

var pokeName, // Nome ou numero passado na caixa de busca
    pokemon, // Responsavel por guardar os dados recebidos da API
    card; // Responsavel por receber o HTML

// Build Functions --------------------------------------------

// Função para reduzir a escrita na captura de elementos HTML
function getElement(elemento) {
  return document.querySelector(elemento);
}

// Função responsavel por fazer requisições para a API e inserir as respostas na variavel pokemon
function requestPokeInfo(url, name) {
  fetch(url + name)
    .then(response => response.json())
    .then(data => {
      pokemon = data;
    })
    .catch(err => console.log(err));
}



// Função responsavel por montar o HTML exibido na pagina
function criarCard () {
  card = `
    <div class="pokemon-picture">
      <img src="${pokemon.sprites.front_default}" alt="Sprite of ${pokemon.name}">
    </div>
    <div class="pokemon-info">
        <h1 class="name">Nome: ${pokemon.name}</h1>
        <h2 class="number">Nº ${pokemon.id}</h2>
        <h3 class="type">Tipo: ${pokemon.types.map(item => item.type.name).toString()}</h3>
        <h3 class="skill">Habilidades: ${pokemon.moves.map(item => ' ' + item.move.name).toString()}</h3>
        <h3 class="weight">Peso: ${pokemon.weight  / 10}kg</h3>
        <h3 class="height">Altura: ${pokemon.height  / 10}m</h3>
    </div>`;
  return card;
}


// Função que faz a chamada das principais funções e inicia o app
function startApp(pokeName) {
  requestPokeInfo(baseUrl, pokeName);

  setTimeout(function () {
    //Exibe uma mensagem caso o pokemon pesquisado não exista
    if(pokemon.detail) {
      msgErro.style.display = "block";
      container.style.display = "none";
    }else{
      msgErro.style.display = "none";
      container.style.display = "flex";
      container.innerHTML = criarCard();
    }
  }, 2000);
}

// Add Events --------------------------------------------
  botaoInput.addEventListener("click", event => {
  event.preventDefault();
  pokeName = buscaInput.value.toLowerCase();
  startApp(pokeName);
  container.classList.add("fade");

  // Reseta o efeito fade removendo a classe fade
  setTimeout(() => {
    container.classList.remove("fade");
  }, 3000);
});