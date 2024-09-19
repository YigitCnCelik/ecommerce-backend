const Order = require('../models/Order');
const User = require('../models/User');
const Service = require('../models/Service');

exports.createOrder = async (req, res) => {
  const { service_id, quantity } = req.body;
  try {
    const service = await Service.findByPk(service_id);
    if (!service) {
      return res.status(404).json({ error: 'Servis bulunamadı.' });
    }

    const user = await User.findByPk(req.userId);
    const total_price = service.price * quantity;

    if (user.balance < total_price) {
      return res.status(400).json({ error: 'Yetersiz bakiye.' });
    }

    const order = await Order.create({ userId: user.id, serviceId: service.id, quantity, total_price });
    user.balance -= total_price;
    await user.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.userId } });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
