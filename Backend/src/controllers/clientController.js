// Array simulado de clientes
let clients = [
  {
    id: 1,
    name: 'Beatriz Silveira',
    email: 'beatriz@email.com',
    totalOrders: 4,
    totalSpent: 980.00,
    lastPurchase: '2026-05-12'
  },
  {
    id: 2,
    name: 'Henrique Costa',
    email: 'henrique@email.com',
    totalOrders: 2,
    totalSpent: 318.00,
    lastPurchase: '2026-05-10'
  },
  {
    id: 3,
    name: 'Mariana Luz',
    email: 'mariana@email.com',
    totalOrders: 6,
    totalSpent: 1420.00,
    lastPurchase: '2026-05-14'
  },
  {
    id: 4,
    name: 'Carlos Mendes',
    email: 'carlos@email.com',
    totalOrders: 1,
    totalSpent: 189.00,
    lastPurchase: '2026-05-08'
  }
];

/**
 * Listar todos os clientes (admin)
 * GET /api/clients
 */
function listClients(req, res) {
  return res.json({
    message: 'Clientes listados com sucesso.',
    clients
  });
}

/**
 * Buscar cliente por ID (admin)
 * GET /api/clients/:id
 */
function getClientById(req, res) {
  const id = Number(req.params.id);

  const client = clients.find((item) => item.id === id);

  if (!client) {
    return res.status(404).json({
      message: 'Cliente não encontrado.'
    });
  }

  return res.json({
    message: 'Cliente encontrado com sucesso.',
    client
  });
}

module.exports = {
  listClients,
  getClientById
};