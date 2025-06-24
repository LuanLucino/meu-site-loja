// Adicionar item
function adicionarCarrinho(produto, botao) {
  const span = botao.previousElementSibling.querySelector(".quantidade");
let quantidade = parseInt(span.textContent);


  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const index = carrinho.findIndex(item => item.nome === produto);

  if (index !== -1) {
    carrinho[index].quantidade += quantidade;
  } else {
    carrinho.push({ nome: produto, quantidade });
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarContadorCarrinho();
  alert(`${quantidade}x ${produto} adicionado(s) ao carrinho!`);
}

//alterar quantidade 

function alterarQuantidade(botao, delta) {
  const span = botao.parentElement.querySelector(".quantidade");
  let valor = parseInt(span.textContent);
  valor = isNaN(valor) ? 1 : valor + delta;
  if (valor < 1) valor = 1;
  span.textContent = valor;
}


// Exibir no carrinho
if (window.location.pathname.includes("carrinho.html")) {
  const container = document.getElementById("itens-carrinho");
  const total = document.getElementById("total");
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  if (carrinho.length === 0) {
    container.innerHTML = "<p>Seu carrinho está vazio.</p>";
    total.textContent = "";
  } else {
    let soma = 0;
    container.innerHTML = "";
    carrinho.forEach((item, index) => {
  soma += item.quantidade * 99.9; // valor fictício
  container.innerHTML += `
    <div>
      <p>${item.nome} - R$ 99,90 x ${item.quantidade}
      <button onclick="removerItem(${index})">Remover</button></p>
    </div>
  `;
});

    total.textContent = `Total: R$ ${soma.toFixed(2)}`;
  }
}

// Remover item
function removerItem(index) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  location.reload();
}


function atualizarContadorCarrinho() {
  const span = document.getElementById("contador-carrinho");
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const total = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
  if (span) span.textContent = `(${total})`;
}

// Atualiza contador sempre que a página carregar
atualizarContadorCarrinho();
