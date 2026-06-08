const express = require('express');

const { loginLimiter } = require('../middlewares/securityMiddleware');

const {
  register,
  login,
  logout,
  csrf,
  profile
} = require('../controllers/authController');

const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.get('/csrf', csrf);
router.post('/login', loginLimiter, login);
router.post('/logout', authMiddleware, logout);
router.get('/profile', authMiddleware, profile);

module.exports = router;