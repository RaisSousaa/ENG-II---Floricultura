# Ateliê Verdanza — Sistema Web de Floricultura

Sistema web desenvolvido para gerenciamento e visualização de produtos de uma floricultura. O projeto possui front-end em HTML, CSS e JavaScript, e backend desenvolvido com FastAPI, utilizando PostgreSQL como banco de dados relacional.

## Estrutura do projeto

```text
ENG-II---Floricultura/
├── BackEnd/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── schemas.py
│   │   ├── security.py
│   │   └── seed.py
│   └── requirements.txt
│
├── FrontEnd/
│   ├── index.html
│   ├── catalogo.html
│   ├── produto.html
│   ├── carrinho.html
│   ├── login.html
│   ├── cadastro.html
│   ├── admin.html
│   ├── styles-global.css
│   ├── components.js
│   ├── js/
│   │   ├── api.js
│   │   ├── login.js
│   │   ├── admin.js
│   │   └── produto.js
│   └── resources/
│       └── images/
│
├── .gitignore
└── README.md