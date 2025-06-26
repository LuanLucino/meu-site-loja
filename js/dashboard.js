function exibirIndicadores() {
  const vendas = JSON.parse(localStorage.getItem("vendas_realizadas")) || [];
  const produtos = JSON.parse(localStorage.getItem("estoque_produtos")) || [];

  let total = 0;
  let itensVendidos = 0;

  vendas.forEach(venda => {
    venda.itens.forEach(item => {
      total += item.preco * item.quantidade;
      itensVendidos += item.quantidade;
    });
  });

  document.getElementById("indicador-faturamento").textContent = `Faturamento: R$ ${total.toFixed(2)}`;
  document.getElementById("indicador-itens").textContent = `Itens Vendidos: ${itensVendidos}`;
  document.getElementById("indicador-produtos").textContent = `Produtos Ativos: ${produtos.length}`;
}

document.addEventListener("DOMContentLoaded", () => {
  exibirIndicadores();
  const { labels, valores } = agruparVendasPorDia();
  const ctx = document.getElementById("graficoVendas").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Vendas (R$)",
        data: valores,
        backgroundColor: "#007bff",
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "Faturamento por Dia da Semana",
          color: document.body.classList.contains("dark-mode") ? "#eee" : "#222"
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: document.body.classList.contains("dark-mode") ? "#ccc" : "#444" }
        },
        x: {
          ticks: { color: document.body.classList.contains("dark-mode") ? "#ccc" : "#444" }
        }
      }
    }
  });
});


function agruparVendasPorDia() {
  const vendas = JSON.parse(localStorage.getItem("vendas_realizadas")) || [];
  const dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const somaPorDia = Array(7).fill(0);

  vendas.forEach(venda => {
    const data = new Date(venda.data);
    const dia = data.getDay();

    const totalVenda = venda.itens.reduce((soma, item) => {
      return soma + item.preco * item.quantidade;
    }, 0);

    somaPorDia[dia] += totalVenda;
  });

  return { labels: dias, valores: somaPorDia };
}

function calcularMaisVendidos() {
  const vendas = JSON.parse(localStorage.getItem("vendas_realizadas")) || [];
  const mapaProdutos = {};

  vendas.forEach(venda => {
    venda.itens.forEach(item => {
      if (!mapaProdutos[item.nome]) {
        mapaProdutos[item.nome] = item.quantidade;
      } else {
        mapaProdutos[item.nome] += item.quantidade;
      }
    });
  });

  const nomes = Object.keys(mapaProdutos);
  const quantidades = Object.values(mapaProdutos);

  return { nomes, quantidades };
}

document.addEventListener("DOMContentLoaded", () => {
  const { labels, valores } = agruparVendasPorDia();
  const ctx = document.getElementById("graficoVendas").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Vendas (R$)",
        data: valores,
        backgroundColor: "#007bff",
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "Faturamento por Dia da Semana",
          color: "#222"
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: "#444" }
        },
        x: {
          ticks: { color: "#444" }
        }
      }
    }
  });
});


// Gráfico de produtos mais vendidos
const { nomes, quantidades } = calcularMaisVendidos();
const ctx2 = document.getElementById("graficoMaisVendidos").getContext("2d");

new Chart(ctx2, {
  type: "bar",
  data: {
    labels: nomes,
    datasets: [{
      label: "Quantidade Vendida",
      data: quantidades,
      backgroundColor: "#28a745",
      borderRadius: 6
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Mais Vendidos",
        color: document.body.classList.contains("dark-mode") ? "#eee" : "#222"
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: document.body.classList.contains("dark-mode") ? "#ccc" : "#444" }
      },
      x: {
        ticks: { color: document.body.classList.contains("dark-mode") ? "#ccc" : "#444" }
      }
    }
  }
});
