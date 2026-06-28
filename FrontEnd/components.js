/* ── COMPONENTES REUTILIZÁVEIS ── */

/**
 * Renderiza o header/ Menu de navegação
 */
function renderNav() {
  const nav = document.querySelector('nav'); // procura no html <nav></nav>
  if (!nav) return;

  //coloca no Html dentro da tag <nav> o código abaixo
  nav.innerHTML = ` 
    <a href="index.html" class="nav-logo">Ateliê verdanza</a>
    <ul class="nav-links">
      <li><a href="index.html" class="${getCurrentPage() === 'index' ? 'active' : ''}">Home</a></li>
      <li><a href="catalogo.html" class="${getCurrentPage() === 'catalogo' ? 'active' : ''}">Catálogo</a></li>
      <li><a href="about.html" class="${getCurrentPage() === 'about' ? 'active' : ''}">Sobre</a></li>
    </ul>
    <div class="nav-actions">
      <button class="nav-icon" title="Carrinho" onclick="window.location.href='carrinho.html'">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <span class="cart-badge" id="nav-badge">0</span>
      </button>
      <button class="nav-icon" title="Conta" onclick="window.location.href='login.html'">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      </button>
    </div>
  `;
}

async function checkAuthNav() {
  try {
    const user = await apiRequest("/auth/profile");
    if (user) {
      const navActions = document.querySelector(".nav-actions");
      if (navActions) {
        const accountBtn = navActions.querySelector('button[title="Conta"]');
        if (accountBtn) {
          accountBtn.outerHTML = `
            <div class="user-menu-container" style="position: relative; display: inline-block;">
              <button class="nav-icon user-menu-btn" title="Conta (${user.name})" onclick="toggleUserMenu()" style="display: flex; align-items: center; gap: 8px; background: none; border: none; cursor: pointer; color: inherit; padding: 0;">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <span class="user-nav-name" style="font-size: 0.8rem; max-width: 80px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 400;">${user.name.split(' ')[0]}</span>
              </button>
              <div id="user-dropdown-menu" style="display: none; position: absolute; right: 0; top: 100%; background: white; border: 1px solid var(--border); border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 100; min-width: 140px; padding: 8px 0; margin-top: 8px;">
                ${user.is_admin ? '<a href="admin.html" style="display: block; padding: 8px 16px; text-decoration: none; color: var(--text-dark); font-size: 0.8rem; text-align: left; font-family: \'Jost\', sans-serif;">Painel Admin</a>' : ''}
                <button onclick="logoutUser()" style="width: 100%; text-align: left; background: none; border: none; padding: 8px 16px; color: #c0392b; font-size: 0.8rem; cursor: pointer; font-family: \'Jost\', sans-serif;">Sair</button>
              </div>
            </div>
          `;
        }
      }
    }
  } catch (e) {
    // Not logged in or error, keep default
  }
}

function toggleUserMenu() {
  const menu = document.getElementById("user-dropdown-menu");
  if (menu) {
    menu.style.display = menu.style.display === "none" ? "block" : "none";
  }
}

async function logoutUser() {
  try {
    await apiRequest("/auth/logout", { method: "POST" });
    if (typeof showToast === 'function') {
      showToast("Até logo!");
    } else {
      alert("Até logo!");
    }
    setTimeout(() => {
      window.location.href = "index.html";
    }, 800);
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    window.location.href = "login.html";
  }
}

// Close user dropdown if clicking outside
document.addEventListener("click", function(event) {
  const container = document.querySelector(".user-menu-container");
  const menu = document.getElementById("user-dropdown-menu");
  if (container && menu && !container.contains(event.target)) {
    menu.style.display = "none";
  }
});

/**
 * Renderiza o footer/Rodapé
 */
function renderFooter() {
  const footer = document.querySelector('footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer-top">
      <div class="footer-brand">
        <h3>Ateliê verdanza</h3>
        <p>Compartilhando um futuro mais verde, uma folha de cada vez. Junte-se a nós em nossa jornada de orgânicos.</p>
        <div class="footer-socials">
        </div>
      </div>

      <div class="footer-col">
        <h4>Menu</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="catalogo.html">Catálogo</a></li>
          <li><a href="about.html">Sobre</a></li>
          <li><a href="#">Contato</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Fale conosco</h4>
        <address>
          Bairro Jorge, Rua 40<br />
          Piso 4º, Rio 12<br />
          Seg a Sab, 10h às 18h
        </address>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© 2024 Ateliê verdanza. Todos os direitos reservados.</p>
      <div class="footer-bottom-links">
        <a href="login.html">Termos de Serviço</a>
        <a href="#">Formatos de Páginas</a>
      </div>
    </div>
  `;
}

/**
 * Obtém a página atual baseado no nome do arquivo
 */
function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes('index')) return 'index';
  if (path.includes('catalogo')) return 'catalogo';
  if (path.includes('carrinho')) return 'carrinho';
  if (path.includes('about')) return 'about';
  if (path.includes('produto')) return 'produto';
  if (path.includes('login')) return 'login';
  if (path.includes('admin')) return 'admin';
  return 'index';
}

/**
 * Exibe notificação (toast) / mensagem temporária
 */
function showToast(message) {
  const toast = document.getElementById('toast') || createToastElement();
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

/**
 * Cria elemento de toast se não existir
 */
function createToastElement() {
  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.className = 'toast';
  document.body.appendChild(toast);
  return toast;
}

/**
 * Inicializa componentes globais
 */
function initComponents() {
  renderNav();
  renderFooter();
  if (typeof apiRequest === 'function') {
    checkAuthNav();
  }
}

// Auto-inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComponents);
} else {
  initComponents();
}

// Funções do carrinho
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

//Contador do carrinho
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const totalItems = cart.reduce((total, item) => {
    return total + Number(item.quantity || 1);
  }, 0);

const counters = document.querySelectorAll('#nav-badge, .cart-badge, .cart-count, #cart-count, [data-cart-count]');
  counters.forEach(counter => {
    counter.textContent = totalItems;
    counter.style.display = totalItems > 0 ? 'inline-flex' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', updateCartCount);


function addToCart(product, quantity = 1) {
  const cart = getCart();

  const productId = String(product.id);
  const existingItem = cart.find(item => String(item.id) === productId);

  if (existingItem) {
    existingItem.quantity += Number(quantity);
  } else {
    cart.push({
      id: product.id,
      name: product.name || product.nome,
      price: Number(product.price || product.preco || 0),
      img: product.img || product.image || product.imagem || '',
      quantity: Number(quantity)
    });
  }

  saveCart(cart);
}

document.addEventListener('DOMContentLoaded', updateCartCount);


/**
 * 1. Menu de navegação
 * 2. Rodapé
 * 3. Toast de mensagens
 * 4. Contador do carrinho
 * 5. Funções do carrinho
 * 6. Card de produto
 * 7. Botão de adicionar ao carrinho
 */
