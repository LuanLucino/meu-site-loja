function loginAdmin() {
  const user = document.getElementById("adminUser").value.trim();
  const pass = document.getElementById("adminPass").value;
  const msg = document.getElementById("mensagemErro");

  const usuarioCerto = "admin";
  const senhaCerta = "senha123";

  if (user === usuarioCerto && pass === senhaCerta) {
    localStorage.setItem("adminLogado", "sim");
    location.href = "admin-produtos.html";
  } else {
    msg.textContent = "Usuário ou senha inválidos.";
  }
}
