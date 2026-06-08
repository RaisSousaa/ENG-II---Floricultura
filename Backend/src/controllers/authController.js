const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { jwtSecret, jwtExpiresIn } = require('../config/env');
const { registerSchema, loginSchema } = require('../validators/authValidator');

const AUTH_COOKIE_NAME = 'token';

function parseExpiresInToMs(expiresIn) {
  if (!expiresIn) return undefined;
  if (typeof expiresIn === 'number' && Number.isFinite(expiresIn)) {
    // jsonwebtoken allows numeric seconds
    return expiresIn * 1000;
  }

  const value = String(expiresIn).trim();
  const match = value.match(/^(\d+)([smhd])$/i);
  if (!match) return undefined;

  const amount = Number(match[1]);
  const unit = match[2].toLowerCase();
  const multipliers = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000
  };

  return amount * multipliers[unit];
}

function getAuthCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production';
  const maxAge = parseExpiresInToMs(jwtExpiresIn);

  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProduction,
    path: '/',
    ...(maxAge ? { maxAge } : {})
  };
}

// Simulação de banco de dados em memória.
// Depois trocamos isso por banco real.
const users = [];

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    jwtSecret,
    {
      expiresIn: jwtExpiresIn
    }
  );
}

async function register(req, res, next) {
  try {
    const data = registerSchema.parse(req.body);

    const userExists = users.find(user => user.email === data.email);

    if (userExists) {
      return res.status(409).json({
        message: 'E-mail já cadastrado.'
      });
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const newUser = {
      id: users.length + 1,
      name: data.name,
      email: data.email,
      passwordHash,
      role: 'admin'
    };

    users.push(newUser);

    return res.status(201).json({
      message: 'Usuário cadastrado com sucesso.',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const data = loginSchema.parse(req.body);

    const user = users.find(user => user.email === data.email);

    if (!user) {
      return res.status(401).json({
        message: 'Credenciais inválidas.'
      });
    }

    const passwordValid = await bcrypt.compare(data.password, user.passwordHash);

    if (!passwordValid) {
      return res.status(401).json({
        message: 'Credenciais inválidas.'
      });
    }

    const token = generateToken(user);

    res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions());

    return res.json({
      message: 'Login realizado com sucesso.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
}

function logout(req, res) {
  res.clearCookie(AUTH_COOKIE_NAME, getAuthCookieOptions());
  return res.json({
    message: 'Logout realizado com sucesso.'
  });
}

function csrf(req, res) {
  return res.json({
    message: 'CSRF token emitido com sucesso.',
    csrfToken: req.csrfToken
  });
}

function profile(req, res) {
  return res.json({
    message: 'Rota protegida acessada com sucesso.',
    user: req.user
  });
}

module.exports = {
  register,
  login,
  logout,
  csrf,
  profile
};