const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const aperturasRoutes = require('./routes/aperturas');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const tareasRoutes = require('./routes/tareas');

app.use('/auth', authRoutes);
app.use('/api/aperturas', aperturasRoutes);

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });

// Conexión a MongoDB
mongoose.connect('mongodb://mongo:27017/aperturasdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.error(err));



// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use('/api/tareas', tareasRoutes);

// Importar rutas
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
