require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const Service = require('./models/Service'); // Import Service model
const seedData = require('./seedData'); // Import seed data

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);
app.use('/services', serviceRoutes);

let server;

const initializeDatabase = async () => {
  try {
    // Synchronize database
    await sequelize.sync();

    // Check existing services
    const existingServices = await Service.findAll();
    const existingServiceNames = existingServices.map(service => service.name);

    // Add missing services
    for (const service of seedData) {
      if (!existingServiceNames.includes(service.name)) {
        await Service.create(service);
      }
    }

    console.log('Seed data added.');
  } catch (error) {
    console.error('Error during database synchronization:', error);
  }
};

// Initialize database and start server
const startServer = async () => {
  await initializeDatabase();
  server = app.listen(3000, () => {
    console.log('Server running on port 3000.');
  });
};

const shutdown = async () => {
  if (server) {
    await new Promise((resolve) => {
      server.close(() => {
        console.log('Server closed.');
        resolve();
      });
    });
  }

  if (sequelize) {
    await sequelize.close()
      .then(() => {
        console.log('Database connection closed.');
      })
      .catch(err => {
        console.error('Error closing database connection:', err);
      });
  }
};

startServer();

module.exports = { app, startServer, shutdown, initializeDatabase };
