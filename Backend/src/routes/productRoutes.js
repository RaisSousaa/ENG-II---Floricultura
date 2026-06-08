const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

const {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const router = express.Router();

/*
  Rotas públicas:
  Usadas por index.html, catalogo.html e produto.html.
  Não exigem login.
*/
router.get('/', listProducts);
router.get('/:id', getProductById);

/*
  Rotas protegidas (admin):
  Usadas pelo painel administrativo.
  Exigem JWT + role admin.
*/
router.post('/', authMiddleware, adminMiddleware, createProduct);
router.put('/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;