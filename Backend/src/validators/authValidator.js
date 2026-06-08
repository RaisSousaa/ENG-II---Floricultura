const { z } = require('zod');

const registerSchema = z.object({
  name: z
    .string()
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),

  email: z
    .string()
    .email('E-mail inválido'),

  password: z
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
});

const loginSchema = z.object({
  email: z
    .string()
    .email('E-mail inválido'),

  password: z
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
});

module.exports = {
  registerSchema,
  loginSchema
};