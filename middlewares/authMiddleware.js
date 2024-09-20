const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == "{{token}}") {
    return res.status(403).send('Token gerekli.');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Geçersiz token.');
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
