const { orderSchema, orderUpdateSchema } = require('../validators/orderValidator');

// Array simulando banco de dados de pedidos
let orders = [
  {
    id: 1,
    clientName: 'Beatriz Silveira',
    clientEmail: 'beatriz@email.com',
    items: [
      { productId: 1, productName: 'Pacova', quantity: 2, price: 99.99 },
      { productId: 3, productName: 'Begônia maculata', quantity: 1, price: 150.00 }
    ],
    total: 349.98,
    status: 'entregue',
    createdAt: '2026-05-12T10:30:00'
  },
  {
    id: 2,
    clientName: 'Henrique Costa',
    clientEmail: 'henrique@email.com',
    items: [
      { productId: 2, productName: 'Filodendro coração', quantity: 1, price: 85.00 }
    ],
    total: 85.00,
    status: 'enviado',
    createdAt: '2026-05-15T14:20:00'
  },
  {
    id: 3,
    clientName: 'Mariana Luz',
    clientEmail: 'mariana@email.com',
    items: [
      { productId: 4, productName: 'Suculenta', quantity: 1, price: 319.90 },
      { productId: 5, productName: 'Arranjo floral', quantity: 2, price: 150.00 }
    ],
    total: 619.90,
    status: 'pendente',
    createdAt: '2026-05-18T09:15:00'
  }
];

let nextOrderId = 4;

/**
 * Listar todos os pedidos (admin)
 * GET /api/orders
 */
function listOrders(req, res) {
  return res.json({
    message: 'Pedidos listados com sucesso.',
    orders
  });
}

/**
 * Buscar pedido por ID
 * GET /api/orders/:id
 */
function getOrderById(req, res) {
  const id = Number(req.params.id);

  const order = orders.find((item) => item.id === id);

  if (!order) {
    return res.status(404).json({
      message: 'Pedido não encontrado.'
    });
  }

  return res.json({
    message: 'Pedido encontrado com sucesso.',
    order
  });
}

/**
 * Criar novo pedido (cliente autenticado ou admin)
 * POST /api/orders
 */
function createOrder(req, res, next) {
  try {
    // Zod valida os dados enviados
    const data = orderSchema.parse(req.body);

    const newOrder = {
      id: nextOrderId++,
      ...data,
      createdAt: new Date().toISOString()
    };

    orders.push(newOrder);

    return res.status(201).json({
      message: 'Pedido criado com sucesso.',
      order: newOrder
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Atualizar status do pedido (admin)
 * PUT /api/orders/:id
 */
function updateOrderStatus(req, res, next) {
  try {
    const id = Number(req.params.id);

    const orderIndex = orders.findIndex((item) => item.id === id);

    if (orderIndex === -1) {
      return res.status(404).json({
        message: 'Pedido não encontrado.'
      });
    }

    // Só permite atualizar o status
    const data = orderUpdateSchema.parse(req.body);

    orders[orderIndex] = {
      ...orders[orderIndex],
      status: data.status
    };

    return res.json({
      message: 'Status do pedido atualizado com sucesso.',
      order: orders[orderIndex]
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listOrders,
  getOrderById,
  createOrder,
  updateOrderStatus
};