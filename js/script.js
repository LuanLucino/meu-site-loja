// Adiciona produto ao carrinho com quantidade personalizada
function adicionarCarrinho(produto, botao) {
  const span = botao.previousElementSibling.querySelector(".quantidade");
  let quantidade = parseInt(span.textContent);
  if (!quantidade || quantidade < 1) quantidade = 1;

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

// Atualiza contador de itens no ícone do carrinho (navbar)
function atualizarContadorCarrinho() {
  const span = document.getElementById("contador-carrinho");
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const total = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
  if (span) span.textContent = `(${total})`;
}

// Permite aumentar ou diminuir quantidade antes de adicionar ao carrinho
function alterarQuantidade(botao, delta) {
  const span = botao.parentElement.querySelector(".quantidade");
  let valor = parseInt(span.textContent);
  valor = isNaN(valor) ? 1 : valor + delta;
  if (valor < 1) valor = 1;
  span.textContent = valor;
}

// Exibe os itens no carrinho (se estiver na página carrinho.html)
if (window.location.pathname.includes("carrinho.html")) {
  const container = document.getElementById("itens-carrinho");
  const total = document.getElementById("total");
  const finalizar = document.getElementById("finalizar-compra");
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  if (carrinho.length === 0) {
    container.innerHTML = "<p>Seu carrinho está vazio.</p>";
    total.textContent = "";
    if (finalizar) finalizar.style.display = "none";
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

  // Evento: finalizar a compra
  if (finalizar) {
    finalizar.addEventListener("click", () => {
      const confirmar = confirm("Deseja finalizar sua compra?");
      if (confirmar) {
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        const historico = JSON.parse(localStorage.getItem("historico")) || [];

        const soma = carrinho.reduce((acc, item) => acc + item.quantidade * 99.9, 0);
const novaCompra = {
  data: new Date().toLocaleString(),
  total: soma.toFixed(2),
  itens: carrinho
};


        historico.push(novaCompra);
        localStorage.setItem("historico", JSON.stringify(historico));

        localStorage.removeItem("carrinho");
        location.href = "obrigado.html";
      }
    });
  }
}

// Remove item individual do carrinho
function removerItem(index) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  location.reload();
}


// Exibe o nome do usuário logado e ativa botão "Sair"
const nomeUsuario = localStorage.getItem("usuarioLogado");
const saudacao = document.getElementById("saudacao");
const btnSair = document.getElementById("btn-sair");

if (nomeUsuario && saudacao && btnSair) {
  saudacao.textContent = `Bem-vindo, ${nomeUsuario}`;
  btnSair.style.display = "inline-block";

  btnSair.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado");
    location.href = "login.html";
  });
}


// Atualiza contador da navbar ao carregar qualquer página
atualizarContadorCarrinho();
