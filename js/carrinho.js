function renderizarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const lista = document.getElementById("listaCarrinho");
  const total = document.getElementById("valorTotal");
  lista.innerHTML = "";
  let soma = 0;

  carrinho.forEach((item, i) => {
    const subtotal = item.preco * item.quantidade;
    soma += subtotal;

    const card = document.createElement("div");
    card.className = "card-carrinho";
    card.innerHTML = `
      <div class="info-carrinho">
        <h3>${item.nome}</h3>
        <p>Preço unitário: R$ ${item.preco.toFixed(2)}</p>
        <p>Total: R$ ${subtotal.toFixed(2)}</p>
      </div>
      <div class="acoes-carrinho">
        <button onclick="alterarQuantidade(${item.id}, -1)">−</button>
        <span class="quantidade">${item.quantidade}</span>
        <button onclick="alterarQuantidade(${item.id}, 1)">+</button>
        <button class="remover" onclick="removerItem(${item.id})">Remover</button>
      </div>
    `;
    lista.appendChild(card);
  });

  total.textContent = `Total: R$ ${soma.toFixed(2)}`;
}

function alterarQuantidade(id, delta) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const item = carrinho.find(p => p.id === id);
  if (!item) return;

  item.quantidade += delta;
  if (item.quantidade < 1) item.quantidade = 1;
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderizarCarrinho();
}

function removerItem(id) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho = carrinho.filter(p => p.id !== id);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderizarCarrinho();
}
