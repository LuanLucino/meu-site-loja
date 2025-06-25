function obterProdutos() {
  return JSON.parse(localStorage.getItem("estoque_produtos")) || [];
}

function salvarProdutos(lista) {
  localStorage.setItem("estoque_produtos", JSON.stringify(lista));
}

function renderizarLista() {
  const lista = document.getElementById("listaProdutos");
  lista.innerHTML = "";
  const produtos = obterProdutos();

  if (produtos.length === 0) {
    lista.innerHTML = "<p>Nenhum produto cadastrado ainda.</p>";
    return;
  }

  produtos.forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("produto-listado");
    div.innerHTML = `
      <strong>${prod.nome}</strong><br>
      Preço: R$ ${prod.preco.toFixed(2)}<br>
      Estoque: ${prod.estoque}
      <div class="acoes">
        <button onclick="editarProduto(${prod.id})">✏️ Editar</button>
        <button onclick="removerProduto(${prod.id})">🗑️ Remover</button>
      </div>
    `;
    lista.appendChild(div);
  });
}

function salvarProduto(e) {
  e.preventDefault();
  const id = document.getElementById("idProduto").value;
  const nome = document.getElementById("nomeProduto").value.trim();
  const preco = parseFloat(document.getElementById("precoProduto").value);
  const estoque = parseInt(document.getElementById("estoqueProduto").value);
  let produtos = obterProdutos();

  if (id) {
    const index = produtos.findIndex(p => p.id == id);
    if (index !== -1) {
      produtos[index].nome = nome;
      produtos[index].preco = preco;
      produtos[index].estoque = estoque;
    }
  } else {
    produtos.push({ id: Date.now(), nome, preco, estoque });
  }

  salvarProdutos(produtos);
  document.querySelector("form").reset();
  document.getElementById("idProduto").value = "";
  renderizarLista();
}

function editarProduto(id) {
  const produto = obterProdutos().find(p => p.id === id);
  if (!produto) return;

  document.getElementById("idProduto").value = produto.id;
  document.getElementById("nomeProduto").value = produto.nome;
  document.getElementById("precoProduto").value = produto.preco;
  document.getElementById("estoqueProduto").value = produto.estoque;
  window.scrollTo(0, 0);
}

function removerProduto(id) {
  if (!confirm("Deseja realmente remover este produto?")) return;
  let produtos = obterProdutos().filter(p => p.id !== id);
  salvarProdutos(produtos);
  renderizarLista();
}

function logoutAdmin() {
  localStorage.removeItem("adminLogado");
  location.href = "admin-login.html";
}
