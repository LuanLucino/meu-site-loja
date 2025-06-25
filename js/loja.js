const quantidades = {};

function alterarQtd(id, delta) {
  if (!quantidades[id]) quantidades[id] = 1;
  quantidades[id] += delta;
  if (quantidades[id] < 1) quantidades[id] = 1;
  document.getElementById(`qtd-${id}`).textContent = quantidades[id];
}

function adicionarAoCarrinho(id) {
  const produtos = JSON.parse(localStorage.getItem("estoque_produtos")) || [];
  const produto = produtos.find(p => p.id === id);
  if (!produto || produto.estoque === 0) return;

  const qtd = quantidades[id] || 1;
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const existente = carrinho.find(p => p.id === id);

  if (existente) {
    existente.quantidade += qtd;
  } else {
    carrinho.push({ id: produto.id, nome: produto.nome, preco: produto.preco, quantidade: qtd });
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert("Produto adicionado ao carrinho!");
}
