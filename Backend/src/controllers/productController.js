const { productSchema, productUpdateSchema } = require('../validators/productValidator');

let products = [
  {
    id: 1,
    name: 'Pacova',
    sub: 'Planta de interior',
    description: 'Planta ornamental de folhagem verde, ideal para ambientes internos.',
    category: 'Plantas',
    price: 99.99,
    status: 'em_estoque',
    img: 'resources/images/8754e248f99b5927f030bced0a93fb36.jpg'
  },
  {
    id: 2,
    name: 'Filodendro coração',
    sub: 'Planta pendente',
    description: 'Planta pendente com folhas em formato de coração, ideal para decoração.',
    category: 'Plantas',
    price: 85.00,
    status: 'em_estoque',
    img: 'resources/images/d4354dd73462954ef4c1cdf9c8e30fc1.jpg'
  },
  {
    id: 3,
    name: 'Begônia maculata',
    sub: 'Folhagem decorativa',
    description: 'Planta ornamental com folhas marcantes e aparência sofisticada.',
    category: 'Plantas',
    price: 150.00,
    status: 'em_estoque',
    img: 'resources/images/f0d31b0b3237e0a5a88f2f86ca38bd6e.jpg'
  },
  {
    id: 4,
    name: 'Suculenta',
    sub: 'Planta ornamental',
    description: 'Planta compacta, resistente e fácil de cuidar.',
    category: 'Plantas',
    price: 319.90,
    status: 'esgotando',
    img: 'resources/images/90b89e249c82e6dc5cbd5a1f773eaf8c.jpg'
  },
  {
    id: 5,
    name: 'Aglaonema',
    sub: 'Planta ornamental',
    description: 'Planta de folhagem exuberante, ideal para interiores.',
    category: 'Plantas',
    price: 50.00,
    status: 'em_estoque',
    img: 'resources/images/c6eb404d8c9fe74cb47da9343739ece4.jpg'
  },
  {
    id: 6,
    name: 'Espada São Jorge',
    sub: 'Planta resistente',
    description: 'Planta resistente e purificadora de ar, ideal para qualquer ambiente.',
    category: 'Plantas',
    price: 200.00,
    status: 'em_estoque',
    img: 'resources/images/69a57341354a598f8fdff98b0d7d1ddc.jpg'
  },
  {
    id: 7,
    name: 'Jose Buono Fiesta',
    sub: 'Planta ornamental',
    description: 'Planta de folhagem única e coloração especial.',
    category: 'Plantas',
    price: 50.00,
    status: 'em_estoque',
    img: 'resources/images/ab7225e0311bb04612106274111969d5.jpg'
  },
  {
    id: 8,
    name: 'Lírio da Paz',
    sub: 'Planta de interior',
    description: 'Planta elegante com flores brancas, símbolo de paz.',
    category: 'Plantas',
    price: 200.00,
    status: 'em_estoque',
    img: 'resources/images/90b89e249c82e6dc5cbd5a1f773eaf8c.jpg'
  },
  {
    id: 9,
    name: 'Suculenta Mini',
    sub: 'Planta compacta',
    description: 'Mini suculenta ideal para pequenos espaços e coleções.',
    category: 'Plantas',
    price: 200.00,
    status: 'em_estoque',
    img: 'resources/images/73284c55cbc5daa50becedac8458858b.jpg'
  },
  {
    id: 10,
    name: 'Arranjo floral',
    sub: 'Arranjo decorativo',
    description: 'Arranjo floral artesanal para decoração e presentes especiais.',
    category: 'Flores',
    price: 150.00,
    status: 'em_estoque',
    img: 'resources/images/arranjo1.jpg'
  },
  {
    id: 11,
    name: 'Buquê',
    sub: 'Buquê especial',
    description: 'Buquê de flores selecionadas para ocasiões especiais.',
    category: 'Flores',
    price: 200.00,
    status: 'em_estoque',
    img: 'resources/images/f0d31b0b3237e0a5a88f2f86ca38bd6e.jpg'
  },
  {
    id: 12,
    name: 'Arranjo floral premium',
    sub: 'Arranjo sofisticado',
    description: 'Arranjo floral premium com design exclusivo.',
    category: 'Flores',
    price: 250.00,
    status: 'em_estoque',
    img: 'resources/images/e35b38f27e82e78c62aca35e0fc73204.jpg'
  }
];

let nextProductId = 13;

function listProducts(req, res) {
  return res.json({
    message: 'Produtos listados com sucesso.',
    products
  });
}

function getProductById(req, res) {
  const id = Number(req.params.id);

  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({
      message: 'Produto não encontrado.'
    });
  }

  return res.json({
    message: 'Produto encontrado com sucesso.',
    product
  });
}

function createProduct(req, res, next) {
  try {
    const data = productSchema.parse(req.body);

    const newProduct = {
      id: nextProductId++,
      ...data
    };

    products.push(newProduct);

    return res.status(201).json({
      message: 'Produto cadastrado com sucesso.',
      product: newProduct
    });
  } catch (error) {
    next(error);
  }
}

function updateProduct(req, res, next) {
  try {
    const id = Number(req.params.id);

    const productIndex = products.findIndex((item) => item.id === id);

    if (productIndex === -1) {
      return res.status(404).json({
        message: 'Produto não encontrado.'
      });
    }

    // Permite atualização parcial (apenas campos enviados)
    const data = productUpdateSchema.parse(req.body);

    products[productIndex] = {
      ...products[productIndex],
      ...data
    };

    return res.json({
      message: 'Produto atualizado com sucesso.',
      product: products[productIndex]
    });
  } catch (error) {
    next(error);
  }
}

function deleteProduct(req, res) {
  const id = Number(req.params.id);

  const productExists = products.some((item) => item.id === id);

  if (!productExists) {
    return res.status(404).json({
      message: 'Produto não encontrado.'
    });
  }

  products = products.filter((item) => item.id !== id);

  return res.json({
    message: 'Produto removido com sucesso.'
  });
}

module.exports = {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};