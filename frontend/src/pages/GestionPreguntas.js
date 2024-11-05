import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GestionPreguntas() {
  // Estados para las preguntas y el formulario
  const [preguntas, setPreguntas] = useState([]);
  const [texto, setTexto] = useState('');
  const [tipoRespuesta, setTipoRespuesta] = useState('texto');
  const [opciones, setOpciones] = useState('');

  useEffect(() => {
    // Función para obtener las preguntas existentes
    const fetchPreguntas = async () => {
      try {
        const res = await axios.get('/api/preguntas');
        setPreguntas(res.data);
      } catch (err) {
        console.error(err.response.data.msg);
      }
    };

    fetchPreguntas();
  }, []);

  // Manejar envío del formulario para crear una nueva pregunta
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Preparar datos de la nueva pregunta
      const nuevaPregunta = {
        texto,
        tipoRespuesta,
        opciones: opciones.split(',').map((opcion) => opcion.trim()),
      };

      // Enviar solicitud al backend
      await axios.post('/api/preguntas', nuevaPregunta);

      // Actualizar la lista de preguntas
      setPreguntas([...preguntas, nuevaPregunta]);

      // Limpiar el formulario
      setTexto('');
      setTipoRespuesta('texto');
      setOpciones('');
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  return (
    <div>
      <h2>Gestión de Preguntas del Área</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Texto de la pregunta"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          required
        />
        <select value={tipoRespuesta} onChange={(e) => setTipoRespuesta(e.target.value)}>
          <option value="texto">Texto</option>
          <option value="booleano">Sí/No</option>
          <option value="seleccion">Selección</option>
        </select>
        {tipoRespuesta === 'seleccion' && (
          <input
            type="text"
            placeholder="Opciones (separadas por comas)"
            value={opciones}
            onChange={(e) => setOpciones(e.target.value)}
            required
          />
        )}
        <button type="submit">Agregar Pregunta</button>
      </form>

      <h3>Preguntas Existentes</h3>
      <ul>
        {preguntas.map((pregunta) => (
          <li key={pregunta._id}>
            {pregunta.texto} - Tipo: {pregunta.tipoRespuesta}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GestionPreguntas;
