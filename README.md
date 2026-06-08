# 🌿 API Ateliê Verdanza

API REST para o e-commerce de plantas Ateliê Verdanza.

**Stack:** Node.js • Express • JWT • bcrypt • Zod • Helmet

---

## ✅ Requisitos (Fase 2)

- **Fetch API (assíncrono):** usado no FrontEnd em `FrontEnd/js/api.js` para consumir o BackEnd.
- **Comunicação síncrona (exigência):** Fetch não suporta request síncrono; foi adicionada uma demo mínima via `XMLHttpRequest` (ativar com `?syncDemo=1` em páginas que carregam `FrontEnd/js/api.js`).
- **Web Storage API:**
	- `sessionStorage` (histórico do projeto) para token (não é mais necessário com cookie auth).
	- `localStorage` para carrinho (catalogo/produto).
- **HTTP cookies:** login seta JWT em cookie `httpOnly`.
- **Autenticação:** JWT (role admin) validado no middleware.
- **Segurança extra além da autenticação:** Helmet + CORS + rate limit de login + **CSRF (double submit token)** para POST/PUT/DELETE.
- **Validação:** Zod no BackEnd (validators em `Backend/src/validators/*`).

---

## 🚀 Como rodar

```bash
# Instalar dependências
npm install

# Iniciar servidor (produção)
npm start

# Iniciar com nodemon (desenvolvimento)
npm run dev

# Servidor roda em:
http://localhost:3001

> Nota: para autenticação por cookies funcionar no navegador, abra o FrontEnd em `http://localhost:5500` (mesmo hostname do BackEnd). O CORS em `Backend/.env` está configurado para isso.

## 🔎 Testes rápidos

- Use o arquivo `Backend/testes.http` para exercitar o fluxo completo (register/login/profile, CRUD de products, orders, clients).
- Para rotas de escrita (POST/PUT/DELETE), o BackEnd exige `X-CSRF-Token` (ver comentários no próprio arquivo).
