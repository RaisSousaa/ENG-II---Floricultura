const loginForm = document.querySelector("form");

loginForm.addEventListener("submit", handleLogin);

async function handleLogin(event) {
  if (event) event.preventDefault();

  const email = document.querySelector('input[type="email"]').value.trim();
  const password = document.querySelector('input[type="password"]').value;

  if (!email || !password) {
    alert("Preencha todos os campos.");
    return;
  }

  try {
    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    alert("Login realizado com sucesso!");
    window.location.href = "admin.html";
    
  } catch (error) {
    alert(error.message);
  }
}