const crypto = require('crypto');

const CSRF_COOKIE_NAME = 'csrfToken';

function isSafeMethod(method) {
  return ['GET', 'HEAD', 'OPTIONS'].includes(method);
}

function createCsrfToken() {
  // base64url is supported in modern Node versions
  return crypto.randomBytes(32).toString('base64url');
}

function csrfMiddleware(options = {}) {
  const {
    cookieName = CSRF_COOKIE_NAME,
    ignorePaths = ['/api/auth/csrf'],
    cookieOptions = {}
  } = options;

  return function csrf(req, res, next) {
    const isProduction = process.env.NODE_ENV === 'production';

    const existingToken = req.cookies?.[cookieName];
    const token = existingToken || createCsrfToken();

    if (!existingToken) {
      res.cookie(cookieName, token, {
        httpOnly: false,
        sameSite: 'lax',
        secure: isProduction,
        path: '/',
        ...cookieOptions
      });
    }

    // Expose for controllers if needed
    req.csrfToken = token;

    if (isSafeMethod(req.method)) {
      return next();
    }

    if (ignorePaths.some((p) => req.path.startsWith(p))) {
      return next();
    }

    const headerToken = req.get('X-CSRF-Token');

    if (!headerToken || headerToken !== token) {
      return res.status(403).json({
        message: 'CSRF token inválido ou ausente.'
      });
    }

    return next();
  };
}

module.exports = {
  csrfMiddleware,
  CSRF_COOKIE_NAME
};
