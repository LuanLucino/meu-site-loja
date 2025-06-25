// 🔐 Identifica o usuário logado
const usuarioLogado = localStorage.getItem("usuarioLogado");

// 👋 Controle da navbar (saudação, login e logout)
const saudacao = document.getElementById("saudacao");
const btnSair = document.getElementById("btn-sair");
const loginLink = document.getElementById("login-link");

if (usuarioLogado) {
  if (saudacao) saudacao.textContent = `Bem-vindo, ${usuarioLogado}`;
  if (btnSair) btnSair.style.display = "inline-block";
  if (loginLink) loginLink.style.display = "none";

  btnSair?.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado");
    location.href = "index.html";
  });
} else {
  if (btnSair) btnSair.style.display = "none";
  if (saudacao) saudacao.textContent = "";
  if (loginLink) loginLink.style.display = "inline-block";
}

// 🛒 Adiciona produto ao carrinho com quantidade
function adicionarCarrinho(botao) {
  if (!usuarioLogado) {
    alert("É necessário estar logado para adicionar ao carrinho.");
    location.href = "login.html";
    return;
  }

  const span = botao.previousElementSibling.querySelector(".quantidade");
  let quantidade = parseInt(span.textContent);
  if (!quantidade || quantidade < 1) quantidade = 1;

  const card = botao.closest(".card-produto");
  const nome = card.querySelector("h3").textContent.trim(); // pega o nome certo

  const chaveCarrinho = `carrinho_${usuarioLogado}`;
  let carrinho = JSON.parse(localStorage.getItem(chaveCarrinho)) || [];
  const index = carrinho.findIndex(item => item.nome === nome);

  if (index !== -1) {
    carrinho[index].quantidade += quantidade;
  } else {
    carrinho.push({ nome, quantidade });
  }

  localStorage.setItem(chaveCarrinho, JSON.stringify(carrinho));
  atualizarContadorCarrinho();
  alert(`${quantidade}x ${nome} adicionado(s) ao carrinho!`);
}


// 🔢 Atualiza contador da navbar
function atualizarContadorCarrinho() {
  const span = document.getElementById("contador-carrinho");
  if (!usuarioLogado || !span) return;

  const carrinho = JSON.parse(localStorage.getItem(`carrinho_${usuarioLogado}`)) || [];
  const total = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
  span.textContent = `(${total})`;
}

// ➕ Botões de quantidade
function alterarQuantidade(botao, delta) {
  const span = botao.parentElement.querySelector(".quantidade");
  let valor = parseInt(span.textContent);
  valor = isNaN(valor) ? 1 : valor + delta;
  if (valor < 1) valor = 1;
  span.textContent = valor;
}

// 🧾 Página de carrinho
if (window.location.pathname.includes("carrinho.html")) {
  const container = document.getElementById("itens-carrinho");
  const total = document.getElementById("total");
  const finalizar = document.getElementById("finalizar-compra");

  const chaveCarrinho = `carrinho_${usuarioLogado}`;
  const carrinho = JSON.parse(localStorage.getItem(chaveCarrinho)) || [];

  if (!usuarioLogado) {
    container.innerHTML = "<p>Faça login para visualizar seu carrinho.</p>";
    total.textContent = "";
    if (finalizar) finalizar.style.display = "none";
  } else if (carrinho.length === 0) {
    container.innerHTML = "<p>Seu carrinho está vazio.</p>";
    total.textContent = "";
    if (finalizar) finalizar.style.display = "none";
  } else {
    let soma = 0;
    container.innerHTML = "";
    carrinho.forEach((item, index) => {
      soma += item.quantidade * 99.9;
      container.innerHTML += `
        <div>
          <p>${item.nome} - R$ 99,90 x ${item.quantidade}
          <button onclick="removerItem(${index})">Remover</button></p>
        </div>
      `;
    });
    total.textContent = `Total: R$ ${soma.toFixed(2)}`;

    // Finalizar compra
    if (finalizar) {
      finalizar.style.display = "inline-block";
      finalizar.addEventListener("click", () => {
        const confirmar = confirm("Deseja finalizar sua compra?");
        if (confirmar) {
          const historico = JSON.parse(localStorage.getItem(`historico_${usuarioLogado}`)) || [];
          const novaCompra = {
            data: new Date().toLocaleString(),
            total: soma.toFixed(2),
            itens: carrinho
          };
          historico.push(novaCompra);
          localStorage.setItem(`historico_${usuarioLogado}`, JSON.stringify(historico));
          localStorage.removeItem(`carrinho_${usuarioLogado}`);
          location.href = "obrigado.html";
        }
      });
    }
  }
}


// Alternar entre modo claro e escuro
document.getElementById("toggleTema").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("tema", document.body.classList.contains("dark-mode") ? "escuro" : "claro");
});

// Ao carregar a página, aplica o tema salvo
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("tema") === "escuro") {
    document.body.classList.add("dark-mode");
  }
});


// ❌ Remover item do carrinho
function removerItem(index) {
  const chaveCarrinho = `carrinho_${usuarioLogado}`;
  let carrinho = JSON.parse(localStorage.getItem(chaveCarrinho)) || [];
  carrinho.splice(index, 1);
  localStorage.setItem(chaveCarrinho, JSON.stringify(carrinho));
  location.reload();
}

// 🚀 Atualiza contador ao iniciar
atualizarContadorCarrinho();
