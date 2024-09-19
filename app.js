require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);
app.use('/services', serviceRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Sunucu 3000 portunda çalışıyor.');
  });
});
