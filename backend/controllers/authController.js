const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Controlador para registrar un nuevo usuario
exports.registerUser = async (req, res) => {
  try {
    const { nombre, email, password, rol, area } = req.body;

    // Verificar si el usuario ya existe
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'El usuario ya existe' });

    // Crear nuevo usuario
    user = new User({ nombre, email, password, rol, area });

    // Guardar usuario en la base de datos
    await user.save();

    // Crear y enviar token de autenticación
    const payload = { userId: user._id, rol: user.rol };
    const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controlador para iniciar sesión
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Credenciales inválidas' });

    // Comparar contraseña
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Credenciales inválidas' });

    // Crear y enviar token de autenticación
    const payload = { userId: user._id, rol: user.rol };
    const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
