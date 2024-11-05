const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  // Verificar si no hay token
  if (!token) return res.status(401).json({ msg: 'No hay token, autorización denegada' });

  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Token no válido' });
  }
};
