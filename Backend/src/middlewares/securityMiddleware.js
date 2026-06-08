const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const { frontendUrl } = require('../config/env');

function buildAllowedOrigins() {
  const origins = new Set();

  if (frontendUrl) origins.add(frontendUrl);

  // Common local dev variants
  if (frontendUrl?.includes('localhost')) {
    origins.add(frontendUrl.replace('localhost', '127.0.0.1'));
  }
  if (frontendUrl?.includes('127.0.0.1')) {
    origins.add(frontendUrl.replace('127.0.0.1', 'localhost'));
  }

  origins.add('http://localhost:5500');
  origins.add('http://127.0.0.1:5500');

  return origins;
}

const allowedOrigins = buildAllowedOrigins();

const corsOptions = cors({
  origin(origin, callback) {
    // Allow non-browser clients (curl, REST Client) with no Origin header
    if (!origin) {
      return callback(null, true);
    }

    // Allow local file:// testing only in dev
    if (process.env.NODE_ENV !== 'production' && origin === 'null') {
      return callback(null, 'null');
    }

    if (allowedOrigins.has(origin)) {
      // Be explicit so the response always matches the request Origin.
      return callback(null, origin);
    }

    return callback(new Error(`CORS bloqueado para a origem: ${origin}`));
  },
  credentials: true
});

const helmetOptions = helmet();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    message: 'Muitas tentativas de login. Tente novamente em alguns minutos.'
  }
});

module.exports = {
  corsOptions,
  helmetOptions,
  loginLimiter
};