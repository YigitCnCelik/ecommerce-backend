require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const Service = require('./models/Service'); // Service modelini içe aktarın
const seedData = require('./seedData'); // Başlangıç verilerinizi içe aktarın

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);
app.use('/services', serviceRoutes);

const initializeDatabase = async () => {
  try {
    // Veritabanını senkronize et
    await sequelize.sync();

    // Veritabanındaki mevcut servisleri kontrol et
    const existingServices = await Service.findAll();
    const existingServiceNames = existingServices.map(service => service.name);

    // Eksik olan servisleri ekle
    for (const service of seedData) {
      if (!existingServiceNames.includes(service.name)) {
        await Service.create(service);
      }
    }

    console.log('Başlangıç verileri eklendi.');
  } catch (error) {
    console.error('Veritabanı senkronizasyonu sırasında bir hata oluştu:', error);
  }
};

// Veritabanını başlat ve başlangıç verilerini ekle, ardından sunucuyu başlat
initializeDatabase().then(() => {
  app.listen(3000, () => {
    console.log('Sunucu 3000 portunda çalışıyor.');
  });
});
