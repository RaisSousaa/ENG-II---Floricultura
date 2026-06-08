const { z } = require('zod');

const productSchema = z.object({
  name: z
    .string()
    .min(2, 'O nome do produto deve ter pelo menos 2 caracteres.'),

  description: z
    .string()
    .min(5, 'A descrição deve ter pelo menos 5 caracteres.'),

  category: z
    .enum(['Plantas', 'Flores', 'Vasos', 'Acessórios'], {
      message: 'Categoria inválida.'
    }),

  price: z
    .number({
      message: 'O preço deve ser um número.'
    })
    .positive('O preço deve ser maior que zero.'),

  status: z
    .enum(['em_estoque', 'esgotando', 'esgotado'], {
      message: 'Status inválido.'
    }),

  img: z
    .string()
    .min(3, 'A imagem do produto deve ser informada.')
});

// Schema para atualização parcial (todos os campos opcionais)
const productUpdateSchema = productSchema.partial();

module.exports = {
  productSchema,
  productUpdateSchema
};