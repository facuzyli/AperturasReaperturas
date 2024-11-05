const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de usuarios
exports.registerUser = async (req, res) => {
  try {
    const { nombre, email, password, rol, area } = req.body;

    // Verificar si el usuario ya existe
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'El usuario ya existe' });

    // Crear nuevo usuario
    user = new User({ nombre, email, password, rol, area });

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Guardar usuario
    await user.save();

    res.status(201).json({ msg: 'Usuario registrado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Inicio de sesión
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Credenciales inválidas' });

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Credenciales inválidas' });

    // Crear token
    const payload = { userId: user._id, rol: user.rol };
    const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};