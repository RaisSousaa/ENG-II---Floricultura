const { z } = require('zod');

// Schema para criar pedido - define o formato esperado
const orderSchema = z.object({
  clientName: z
    .string()
    .min(3, 'Nome do cliente deve ter pelo menos 3 caracteres.'),

  clientEmail: z
    .string()
    .email('E-mail inválido.'),

  items: z
    .array(
      z.object({
        productId: z.number().positive('ID do produto inválido.'),
        productName: z.string().min(1, 'Nome do produto é obrigatório.'),
        quantity: z.number().int().positive('Quantidade deve ser maior que zero.'),
        price: z.number().positive('Preço deve ser maior que zero.')
      })
    )
    .min(1, 'Pedido deve ter pelo menos 1 item.'),

  total: z
    .number()
    .positive('Total deve ser maior que zero.'),

  status: z
    .enum(['pendente', 'enviado', 'entregue'], {
      message: 'Status inválido. Use: pendente, enviado ou entregue.'
    })
    .default('pendente') // Se não informar, assume "pendente"
});

// Schema para atualizar status (parcial)
const orderUpdateSchema = z.object({
  status: z
    .enum(['pendente', 'enviado', 'entregue'], {
      message: 'Status inválido. Use: pendente, enviado ou entregue.'
    })
});

module.exports = {
  orderSchema,
  orderUpdateSchema
};