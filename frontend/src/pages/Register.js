import React, { useState } from 'react';
import axios from 'axios';

function Register({ history }) {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('encargado');
  const [area, setArea] = useState('');

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar datos al backend
      const res = await axios.post('/auth/register', { nombre, email, password, rol, area });
      // Guardar token en localStorage
      localStorage.setItem('token', res.data.token);
      // Redirigir al dashboard
      history.push('/dashboard');
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={rol} onChange={(e) => setRol(e.target.value)}>
          <option value="encargado">Encargado</option>
          <option value="area">Área</option>
          <option value="directivo">Directivo</option>
        </select>
        {rol === 'area' && (
          <input
            type="text"
            placeholder="Nombre del Área"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          />
        )}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
