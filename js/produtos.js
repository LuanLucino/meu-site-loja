// 🔄 Carrega ou inicializa os produtos com estoque
const produtosDefault = [
  { id: 1, nome: "Camiseta Estilosa", preco: 99.9, estoque: 10 },
  { id: 2, nome: "Calça Slim", preco: 99.9, estoque: 5 },
  { id: 3, nome: "Jaqueta Urbana", preco: 99.9, estoque: 3 }
];

// 🔐 Garante que o estoque seja salvo apenas uma vez (como seed)
if (!localStorage.getItem("estoque_produtos")) {
  localStorage.setItem("estoque_produtos", JSON.stringify(produtosDefault));
}

// 🔁 Função pra obter os produtos atualizados
function obterProdutos() {
  return JSON.parse(localStorage.getItem("estoque_produtos")) || [];
}

// ✅ Função pra atualizar o estoque de um produto
function atualizarEstoque(id, quantidadeVendida) {
  const produtos = obterProdutos();
  const index = produtos.findIndex(p => p.id === id);
  if (index !== -1) {
    produtos[index].estoque -= quantidadeVendida;
    if (produtos[index].estoque < 0) produtos[index].estoque = 0;
    localStorage.setItem("estoque_produtos", JSON.stringify(produtos));
  }
}
