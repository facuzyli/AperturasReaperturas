const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Importar rutas
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
