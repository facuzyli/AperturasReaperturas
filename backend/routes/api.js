const express = require('express');
const router = express.Router();

// Definir rutas aquí
router.get('/', (req, res) => {
  res.send('API funcionando');
});

module.exports = router;
