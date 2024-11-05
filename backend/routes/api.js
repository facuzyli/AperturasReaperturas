const express = require('express');
const router = express.Router();
const preguntasRoutes = require('./routes/preguntas');


app.use('/api/preguntas', preguntasRoutes);

router.get('/', (req, res) => {
  res.send('API funcionando');
});

module.exports = router;
