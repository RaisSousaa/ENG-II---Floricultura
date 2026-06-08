const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

const {
  listClients,
  getClientById
} = require('../controllers/clientController');

const router = express.Router();

/*
  Rotas protegidas (admin):
  Apenas administradores podem ver dados dos clientes
*/

// Listar todos os clientes
router.get('/', authMiddleware, adminMiddleware, listClients);

// Buscar cliente específico
router.get('/:id', authMiddleware, adminMiddleware, getClientById);

module.exports = router;