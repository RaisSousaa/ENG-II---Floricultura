const express = require('express');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');      // ← NOVO
const clientRoutes = require('./routes/clientRoutes');    // ← NOVO

const { errorMiddleware } = require('./middlewares/errorMiddleware');
const {
  corsOptions,
  helmetOptions
} = require('./middlewares/securityMiddleware');

const { csrfMiddleware } = require('./middlewares/csrfMiddleware');

const app = express();

app.use(helmetOptions);
app.use(corsOptions);

app.use(express.json());
app.use(cookieParser());
app.use(csrfMiddleware());

app.get('/', (req, res) => {
  res.json({
    message: 'API Ateliê Verdanza funcionando'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);      // ← NOVO
app.use('/api/clients', clientRoutes);    // ← NOVO

app.use(errorMiddleware);

module.exports = app;