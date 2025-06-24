// Adicionar item
function adicionarCarrinho(produto) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push(produto);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert(`${produto} adicionado ao carrinho!`);
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
      soma += 99.9; // valor fictício
      container.innerHTML += `
        <div>
          <p>${item} - R$ 99,90 <button onclick="removerItem(${index})">Remover</button></p>
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
