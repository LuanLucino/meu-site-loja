const botaoTema = document.getElementById("toggleTema");

// Aplica o tema salvo ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  const temaSalvo = localStorage.getItem("tema");
  if (temaSalvo === "escuro") {
    document.body.classList.add("dark-mode");
    if (botaoTema) botaoTema.textContent = "🌞";
  }
});

// Alterna o tema e salva no localStorage
if (botaoTema) {
  botaoTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const modoAtivo = document.body.classList.contains("dark-mode") ? "escuro" : "claro";
    localStorage.setItem("tema", modoAtivo);
    botaoTema.textContent = modoAtivo === "escuro" ? "🌞" : "🌙";
  });
}
