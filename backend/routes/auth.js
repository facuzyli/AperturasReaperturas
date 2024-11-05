const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Registro de usuarios
router.post('/register', registerUser);

// Inicio de sesión
router.post('/login', loginUser);

module.exports = router;
