// Redireciona se já estiver logado
async function checkExistingSession() {
  try {
    const user = await apiRequest("/auth/profile");
    if (user) {
      if (user.is_admin) {
        window.location.href = "admin.html";
      } else {
        window.location.href = "index.html";
      }
    }
  } catch (e) {
    // Não está logado
  }
}
checkExistingSession();

const cadastroForm = document.getElementById("registerForm") || document.querySelector("form");

if (cadastroForm) cadastroForm.addEventListener("submit", handleRegister);

async function handleRegister(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name') || document.querySelector('input[name="name"]');
  const emailInput = document.getElementById('email') || document.querySelector('input[type="email"]');
  const passwordInput = document.getElementById('password') || document.querySelector('input[name="password"]');
  const confirmInput = document.getElementById('confirmPassword') || document.querySelector('input[name="confirmPassword"]');

  const name = (nameInput?.value || '').trim();
  const email = (emailInput?.value || '').trim();
  const password = passwordInput?.value || '';
  const confirmar = confirmInput?.value || '';

  if (!name || !email || !password || !confirmar) {
    alert("Preencha todos os campos.");
    return;
  }

  if (!email.includes("@")) {
    alert("Digite um e-mail válido.");
    return;
  }

  if (password.length < 8) {
    alert("A senha deve ter pelo menos 8 caracteres.");
    return;
  }

  if (password !== confirmar) {
    alert("As senhas não coincidem.");
    return;
  }

  try {
    await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";

  } catch (error) {
    alert(error.message);
  }
}