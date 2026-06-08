const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

const {
  listOrders,
  getOrderById,
  createOrder,
  updateOrderStatus
} = require('../controllers/orderController');

const router = express.Router();

/*
  Rotas protegidas:
  - Listar pedidos: só admin
  - Criar pedido: qualquer usuário autenticado (cliente ou admin)
  - Atualizar status: só admin
*/

// Listar todos os pedidos (admin)
router.get('/', authMiddleware, adminMiddleware, listOrders);

// Buscar pedido específico (admin)
router.get('/:id', authMiddleware, adminMiddleware, getOrderById);

// Criar novo pedido (usuário autenticado)
router.post('/', authMiddleware, createOrder);

// Atualizar status do pedido (admin)
router.put('/:id', authMiddleware, adminMiddleware, updateOrderStatus);

module.exports = router;