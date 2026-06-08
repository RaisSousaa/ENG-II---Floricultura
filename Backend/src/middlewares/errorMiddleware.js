const { ZodError } = require('zod');

function errorMiddleware(error, req, res, next) {
  if (error instanceof ZodError) {
    const issues = error.issues || error.errors || [];
    return res.status(400).json({
      message: 'Erro de validação.',
      errors: issues.map(err => ({
        campo: err.path.join('.'),
        mensagem: err.message
      }))
    });
  }

  console.error('Erro interno:', error);

  return res.status(500).json({
    message: 'Erro interno do servidor.'
  });
}

module.exports = {
  errorMiddleware
};